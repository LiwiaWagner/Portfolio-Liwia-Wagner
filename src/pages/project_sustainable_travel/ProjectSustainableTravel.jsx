import React, { useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dashboardCyclisticImg from "../../assets/cyclistic_dashboard_img.png";
import ProjectIntro from "../../components/projectIntro/ProjectIntro";
import "../../components/projectIntro/projectIntro.css";
import { projectIntros } from "../../data/projectIntros";
import "./projectSustainableTravel.css";

const { tableau } = window;
const sqlCreateDB = `-- creating database
CREATE DATABASE sustainable_travel
WITH encoding = 'UTF-8';

COMMENT ON DATABASE sustainable_travel IS 'This database contains data on carbon emissions 
from business travel in 2023 and 2024, 
segmented by business unit, sub-business unit, 
city, country, flight type, travel purpose, and employee.'

-- creating database tables
CREATE TABLE t_travel_data_egencia (
	id_egencia SERIAL PRIMARY KEY,
	arrival_city VARCHAR(70) NOT NULL,
	arrival_country VARCHAR(50),
	business_unit VARCHAR(80) NOT NULL,
	sub_business_unit VARCHAR(120),
	departure_city VARCHAR(70) NOT NULL,
	departure_country VARCHAR(50),
	traveller_name TEXT CONSTRAINT name_length CHECK(length(traveller_name)>3),
	reason_for_travel TEXT,
	travel_start_date DATE CONSTRAINT valid_date CHECK(travel_start_date > '01-01-2000'),
	co2_emission NUMERIC(10,2) DEFAULT 0,
	distance_km NUMERIC(10,2) DEFAULT 0
)

CREATE TABLE t_travel_data_netsuite (
	id_netsuite SERIAL PRIMARY KEY,
	arrival_city VARCHAR(70) NOT NULL,
	arrival_country VARCHAR(50),
	business_unit VARCHAR(80) NOT NULL,
	sub_business_unit VARCHAR(120),
	departure_city VARCHAR(70) NOT NULL,
	departure_country VARCHAR(50),
	traveller_name TEXT CONSTRAINT name_length CHECK(length(traveller_name)>3),
	travel_start_date DATE CONSTRAINT valid_date CHECK(travel_start_date > '01-01-2000'),
	co2_emission NUMERIC(10,2) DEFAULT 0,
	distance_km NUMERIC(10,2) DEFAULT 0
)

CREATE TABLE t_cities (
	city_name VARCHAR(70) NOT NULL,
	city_country VARCHAR(50),
	city_lat TEXT,
	city_long TEXT,
	PRIMARY KEY (city_name, city_country)
)

CREATE TABLE t_carbon_budget (
	business_unit VARCHAR(80) NOT NULL,
	sub_business_unit VARCHAR(120),
	budget_year VARCHAR(4),
	co2_budget INT,
	PRIMARY KEY (business_unit, sub_business_unit, budget_year)
)`;
const sqlDataModel = `ROLLBACK;

BEGIN;

DROP MATERIALIZED VIEW IF EXISTS mv_sustainable_travel;

CREATE MATERIALIZED VIEW mv_sustainable_travel AS 
WITH cte_travel_data AS (
    SELECT 
        id_egencia || 'e' AS row_id,
        arrival_city,
        arrival_country,
        UPPER(business_unit) AS business_unit,
        UPPER(sub_business_unit) AS sub_business_unit,
        departure_city,
        departure_country,
        traveller_name,
        reason_for_travel,
        CASE
            WHEN distance_km > 1500 THEN 'Long-haul'
            WHEN distance_km >= 500 THEN 'Medium-haul'
            ELSE 'Short-haul'
        END AS type_of_flight,
        travel_start_date,
        CAST(EXTRACT(YEAR FROM travel_start_date) AS character varying) AS travel_year,
        co2_emission,
        distance_km
    FROM mv_travel_data_egencia

    UNION ALL

    SELECT 
        id_netsuite || 'n' AS row_id,
        arrival_city,
        arrival_country,
        UPPER(business_unit) AS business_unit,
        UPPER(sub_business_unit) AS sub_business_unit,
        departure_city,
        departure_country,
        traveller_name,
        NULL AS reason_for_travel,
        CASE
            WHEN distance_km > 1500 THEN 'Long-haul'
            WHEN distance_km >= 500 THEN 'Medium-haul'
            ELSE 'Short-haul'
        END AS type_of_flight,
        travel_start_date,
        CAST(EXTRACT(YEAR FROM travel_start_date) AS character varying) AS travel_year,
        co2_emission,
        distance_km
    FROM mv_travel_data_netsuite
),

cte_cities AS (
    SELECT 
        t.*, 
        c.city_lat AS arrival_city_lat,
        c.city_long AS arrival_city_long,
        d.city_lat AS departure_city_lat,  
        d.city_long AS departure_city_long,
        SUM(t.co2_emission) OVER(PARTITION BY t.sub_business_unit, t.travel_year) AS sum_co2_subbu,
        SUM(t.co2_emission) OVER(PARTITION BY t.business_unit, t.travel_year) AS sum_co2_bu,
        SUM(t.co2_emission) OVER(PARTITION BY t.travel_year) AS sum_co2_year_total
    FROM cte_travel_data t
    LEFT JOIN mv_cities c 
        ON t.arrival_city = c.city_name AND t.arrival_country = c.city_country
    LEFT JOIN mv_cities d 
        ON t.departure_city = d.city_name AND t.departure_country = d.city_country
),

cte_budget_subbu AS (
    SELECT 
        c.*,
        b.co2_budget,
        CAST(b.budget_year AS character varying) AS budget_year,
        MAX(b.co2_budget) OVER(PARTITION BY c.sub_business_unit, c.travel_year) AS co2_budget_subbu
    FROM cte_cities c 
    LEFT JOIN mv_carbon_budget b
        ON UPPER(b.business_unit) = c.business_unit
        AND UPPER(b.sub_business_unit) = c.sub_business_unit
        AND CAST(b.budget_year AS character varying) = c.travel_year
),

cte_distinct_budgets AS (
    -- Select distinct co2_budget_subbu values to prevent duplicate summing
    SELECT DISTINCT business_unit, travel_year, sub_business_unit, co2_budget_subbu
    FROM cte_budget_subbu
),

cte_budget_bu AS (
    -- Calculate the business_unit level total budget for each travel_year
    SELECT 
        business_unit,
        travel_year,
        SUM(co2_budget_subbu) AS co2_budget_bu
    FROM cte_distinct_budgets
    GROUP BY business_unit, travel_year
),

cte_budget_year AS (
    -- Calculate the year level total budget for each travel_year
    SELECT 
        travel_year,
        SUM(co2_budget_bu) AS co2_budget_year
    FROM cte_budget_bu
    GROUP BY travel_year
)

SELECT 
    sbu.*, 
    bu.co2_budget_bu AS co2_budget_bu,
	y.co2_budget_year
FROM cte_budget_subbu sbu
JOIN cte_budget_bu bu
    ON sbu.business_unit = bu.business_unit 
    AND sbu.travel_year = bu.travel_year
JOIN cte_budget_year y
    ON bu.travel_year = y.travel_year;

COMMIT;`;
const sqlTriggers = `-- creating or replacing the function to refresh the materialized view after each data modification 
CREATE OR REPLACE FUNCTION refresh_materialized_view()
    RETURNS TRIGGER AS 
$$ 
BEGIN 
    REFRESH MATERIALIZED VIEW mv_sustainable_travel;
    RETURN NULL; 
END; 
$$ 
LANGUAGE plpgsql;

-- creating the trigger for t_travel_data_egencia table
CREATE TRIGGER t_travel_data_egencia_refresh
AFTER INSERT OR UPDATE OR DELETE ON t_travel_data_egencia  
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_materialize_view()
WITH DEFERRABLE INITIALLY DEFERRED;

-- creating the trigger for t_travel_data_netsuite table
CREATE TRIGGER t_travel_data_netsuite_refresh
AFTER INSERT OR UPDATE OR DELETE ON t_travel_data_netsuite
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_materialized_view()
WITH DEFERRABLE INITIALLY DEFERRED;

-- creating the trigger for t_cities table
CREATE TRIGGER t_cities_refresh
AFTER INSERT OR UPDATE OR DELETE ON t_cities
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_materialized_view()
WITH DEFERRABLE INITIALLY DEFERRED;

-- creating the trigger for t_carbon_budget table
CREATE TRIGGER t_carbon_budget_refresh
AFTER INSERT OR UPDATE OR DELETE ON t_carbon_budget
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_materialized_view()
WITH DEFERRABLE INITIALLY DEFERRED;`;
const sqlTriggersCheck = `-- checking if the trigger for travel_data_egencia table has been created
SELECT tgname
FROM pg_trigger
WHERE tgrelid = 't_travel_data_egencia'::regclass
  AND tgname = 't_travel_data_egencia_refresh';
  
-- checking if the trigger for travel_data_netsuite table has been created
SELECT tgname
FROM pg_trigger
WHERE tgrelid = 't_travel_data_netsuite'::regclass
AND tgname = 't_travel_data_netsuite_refresh';

-- checking if the trigger for cities table has been created
SELECT tgname
FROM pg_trigger
WHERE tgrelid = 't_cities'::regclass
AND tgname = 't_cities_refresh';
  
-- checking if the trigger for carbon_budget table has been created
SELECT tangle
FROM pg_trigger
WHERE tgrelid = 't_carbon_budget'::regclass
AND tgname = 't_carbon_budget_refresh';`;
const sqlDateCheck = `SELECT 
                    EXTRACT('YEAR' FROM travel_start_date) AS year_test,
                    EXTRACT('MONTH' FROM travel_start_date) AS month_test 
FROM mv_sustainable_travel
GROUP BY 
                    EXTRACT('YEAR' FROM travel_start_date),
                    EXTRACT('MONTH' FROM travel_start_date)
ORDER by year_test, month_test;`;
const sqlIDCheck = `-- checking min and max length of row IDs
SELECT 
	MIN(LENGTH(row_id)), 
	MAX(LENGTH(row_id)) 
FROM mv_sustainable_travel;

-- checking the total number of row_ids to confirm if there is one row per row_id
SELECT COUNT(row_id) FROM mv_sustainable_travel; 

-- checking if ride IDs have any duplicate values
SELECT COUNT(DISTINCT(row_id)) FROM mv_sustainable_travel;`;
const sqlNullCheck = `SELECT 
                    COUNT(*) - COUNT(row_id) AS row_id_nc, --0
                    COUNT(*) - COUNT(arrival_city) AS arrival_city_nc, --0
                    COUNT(*) - COUNT(arrival_country) AS arrival_country_nc, --0
                    COUNT(*) - COUNT(business_unit) AS business_unit_nc, --0
                    COUNT(*) - COUNT(sub_business_unit) AS sub_business_unit_nc, --0
                    COUNT(*) - COUNT(departure_city) AS departure_city_nc, --0
                    COUNT(*) - COUNT(departure_country) AS departure_country_nc, --0
                    COUNT(*) - COUNT(traveller_name) AS traveller_name_nc, --0
                    COUNT(*) - COUNT(reason_for_travel) AS reason_for_travel_nc, --138
                    COUNT(*) - COUNT(type_of_flight) AS type_of_flight_nc, --0
                    COUNT(*) - COUNT(travel_start_date) AS travel_start_date_nc, --0
                    COUNT(*) - COUNT(travel_year) AS travel_year_nc, --0
                    COUNT(*) - COUNT(co2_emission) AS co2_emission_nc, --0
                    COUNT(*) - COUNT(distance_km) AS distance_km_nc, --0
                    COUNT(*) - COUNT(arrival_city_lat) AS arrival_city_lat_nc, --4
                    COUNT(*) - COUNT(arrival_city_long) AS arrival_city_long_nc, --4
                    COUNT(*) - COUNT(departure_city_lat) AS departure_city_lat_nc, --0
                    COUNT(*) - COUNT(departure_city_long) AS departure_city_long_nc, --0
                    COUNT(*) - COUNT(sum_co2_subbu) AS sum_co2_subbu_nc, --0
                    COUNT(*) - COUNT(sum_co2_bu) AS sum_co2_bu_nc, --0
                    COUNT(*) - COUNT(sum_co2_year_total) AS sum_co2_year_total_nc, --0
                    COUNT(*) - COUNT(co2_budget) AS co2_budget_nc, --0
                    COUNT(*) - COUNT(budget_year) AS budget_year_nc, --0
                    COUNT(*) - COUNT(co2_budget_subbu) AS co2_budget_subbu_nc, --0
                    COUNT(*) - COUNT(co2_budget_bu) AS co2_budget_bu_nc, --0
                    COUNT(*) - COUNT(co2_budget_year) AS co2_budget_year_nc --0
FROM mv_sustainable_travel;`;
const sqlBuCheck = `SELECT COUNT(DISTINCT(business_unit)) FROM mv_sustainable_travel;	
SELECT DISTINCT(business_unit) FROM mv_sustainable_travel;

SELECT COUNT(DISTINCT(sub_business_unit)) FROM mv_sustainable_travel;
SELECT DISTINCT(sub_business_unit) FROM mv_sustainable_travel;`;
const sqlRemoveNull = `SELECT * FROM mv_sustainable_travel
WHERE arrival_city_lat IS NULL
OR arrival_city_long IS NULL;

DELETE FROM travel_data_egencia
WHERE id_egencia IN('1650', '1649', '684', '1239');`;
const sqlRemoveDate = `SELECT * FROM mv_sustainable_travel
WHERE EXTRACT('YEAR' FROM travel_start_date) = '2025'

DELETE FROM t_travel_data_egencia
WHERE id_egencia IN('386', '507', '520', '321', '373', '537', '347', '360', '334');`;
const sqlCorrectBu = `'SET business_unit = 'FINCO'
WHERE id='173'

UPDATE t_travel_data_netsuite
SET sub_business_unit = 'DEBT COLLECTION'
WHERE sub_business_unit = 'DEBTCO'`;
const sqlYearlyAnalysis = `SELECT 
                    travel_year,
                    type_of_flight,
                    SUM(co2_emissions) AS sum_co2_year_total,
                    co2_budget_year,
                    ROUND((co2_budget_year - SUM(co2_emissions)), 0) AS "total_budget_vs_emission",
                    ROUND(CASE WHEN co2_budget_year <> 0 THEN (SUM(co2_emissions) / co2_budget_year) * 100 ELSE 0 END, 2) AS "budget_used_%"
FROM mv_sustainable_travel
GROUP BY     
                    travel_year,
                    type_of_flight,
                    co2_budget_year;`;
const sqlBuAnalysis = `SELECT 
                    business_unit,
                    sum_co2_bu,
                    co2_budget_bu,
                    ROUND((co2_budget_bu - sum_co2_bu), 0) AS "bu_budget_vs_emission",
                    ROUND(CASE WHEN co2_budget_bu <> 0 THEN (sum_co2_bu / co2_budget_bu) * 100 ELSE 0 END, 2) AS "bu_budget_used_%",
                    sub_business_unit,
                    sum_co2_subbu,
                    co2_budget_subbu,
                    ROUND((co2_budget_subbu - sum_co2_subbu), 0) AS "subbu_budget_vs_emission",
                    ROUND(CASE WHEN co2_budget_subbu <> 0 THEN (sum_co2_subbu / co2_budget_subbu) * 100 ELSE 0 END, 2) AS "subbu_budget_used_%"
FROM mv_sustainable_travel
WHERE travel_year = '2024' 
GROUP BY 
                    business_unit,
                    sum_co2_bu,
                    co2_budget_bu,
                    sub_business_unit,
                    sum_co2_subbu,
                    co2_budget_subbu
ORDER BY sum_co2_bu DESC;`;
const sqlEmployeeAnalysis = `SELECT 
                    traveller_name,
                    business_unit,
                    sub_business_unit,
                    reason_for_travel,
                    SUM(co2_emission) AS total_co2_emission
FROM mv_sustainable_travel
WHERE travel_year = '2024' 
GROUP BY 
                    traveller_name,
                    business_unit,
                    sub_business_unit,
                    reason_for_travel
ORDER BY total_co2_emission DESC
LIMIT 10;`;
const sqlEmpNormAnalysis = `SELECT 
                    business_unit,
                    sub_business_unit,
                    travel_year,
                    SUM(co2_emission) AS total_co2_emission,
                    COUNT (DISTINCT traveller_name) AS employee_count,
                    CASE 
                        WHEN COUNT (DISTINCT traveller_name) > 0 THEN ROUND(SUM(co2_emission) / COUNT (DISTINCT traveller_name), 2)
                        ELSE NULL
                    END AS co2_per_employee
FROM mv_sustainable_travel 
GROUP BY 
                    business_unit, 
                    sub_business_unit, 
                    travel_year
ORDER BY 
                    travel_year, 
                    business_unit, 
                    sub_business_unit;
`;
const sqlTypeYearlyAnalysis = `SELECT
                    type_of_flight,
                    ROUND(SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END), 2) AS "co2_emission_2024",
                    ROUND(SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END), 2) AS "co2_emission_2023",
                    ROUND(
                        SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END) - 
                        SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END), 
                        2
                    ) AS "yearly_diff",
                    ROUND(
                        CASE 
                            WHEN SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END) = 0 THEN NULL
                            ELSE 
                                (SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END) - 
                                SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END)
                                ) / SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END) * 100
                        END,
                        2
                    ) AS "yearly_diff_%"
FROM mv_sustainable_travel
GROUP BY type_of_flight;`;
const sqlReasonYearlyAnalysis = `SELECT
                    reason_for_travel,
                    ROUND(SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END), 2) AS "co2_emission_2024",
                    ROUND(SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END), 2) AS "co2_emission_2023",
                    ROUND(
                        SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END) - 
                        SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END), 
                        2
                    ) AS "yearly_diff",
                    ROUND(
                        CASE 
                            WHEN SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END) = 0 THEN NULL
                            ELSE 
                                (SUM(CASE WHEN travel_year = '2024' THEN co2_emission ELSE 0 END) - 
                                SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END)
                                ) / SUM(CASE WHEN travel_year = '2023' THEN co2_emission ELSE 0 END) * 100
                        END,
                        2
                    ) AS "yearly_diff_%"
FROM mv_sustainable_travel
GROUP BY reason_for_travel;`;
const sqlCitiesAnalysis = `-- arrival cities that generates highest CO2e
SELECT 
                    travel_year,
                    arrival_city,
                    arrival_country,
                    SUM(co2_emission)
FROM mv_sustainable_travel
WHERE travel_year = '2024'
GROUP BY 
                    travel_year,
                    arrival_city,
                    arrival_country
ORDER BY SUM(co2_emission) DESC
LIMIT 10;

-- departure cities that generates highest CO2e
SELECT 
                    travel_year,
                    departure_city,
                    departure_country,
                    SUM(co2_emission)
FROM mv_sustainable_travel
WHERE travel_year = '2024'
GROUP BY 
                    travel_year,
                    departure_city,
                    departure_country
ORDER BY SUM(co2_emission) DESC
LIMIT 10;`;
const sqlRoutesAnalysis = `SELECT
                    travel_year,
                    departure_city,
                    departure_country,
                    arrival_city,
                    arrival_country,
                    SUM(co2_emission) AS total_co2_emission,
                    ROUND(SUM(co2_emission) / SUM(distance_km), 2) AS emissions_per_km  
FROM mv_sustainable_travel
WHERE travel_year = '2024'
GROUP BY 
                    travel_year,
                    departure_city,
                    departure_country,
                    arrival_city,
                    arrival_country
ORDER BY total_co2_emission DESC
LIMIT 10;`;
const sqlSeasonalAnalysis = `SELECT
                    travel_year,
                    CAST(EXTRACT(MONTH FROM travel_start_date) AS character varying) AS travel_month,
                    SUM(co2_emission) AS co2_emission,

-- Absolute difference from the previous month
                    SUM(co2_emission) - LAG(SUM(co2_emission)) OVER (PARTITION BY travel_year ORDER BY EXTRACT(MONTH FROM travel_start_date)) AS monthly_diff,

-- Percentage difference from the previous month
                    CASE 
                        WHEN LAG(SUM(co2_emission)) OVER (PARTITION BY travel_year ORDER BY EXTRACT(MONTH FROM travel_start_date)) = 0 THEN NULL
                        ELSE ROUND(
                            (SUM(co2_emission) - LAG(SUM(co2_emission)) OVER (PARTITION BY travel_year ORDER BY EXTRACT(MONTH FROM travel_start_date))) /
                            LAG(SUM(co2_emission)) OVER (PARTITION BY travel_year ORDER BY EXTRACT(MONTH FROM travel_start_date)) * 100, 
                            2
                        )
                    END AS monthly_diff_%,

-- Running total of co2_emission for the year
                    SUM(SUM(co2_emission)) OVER (PARTITION BY travel_year ORDER BY EXTRACT(MONTH FROM travel_start_date) ROWS UNBOUNDED PRECEDING) AS running_total

FROM mv_sustainable_travel
GROUP BY travel_year, travel_month
ORDER BY travel_year, travel_month;
`;

export const ProjectSustainableTravel = () => {
  let viz = window.tableau.VizManager.getVizs()[0];
  const ref = useRef(null);
  const url =
    "https://public.tableau.com/views/SustainableTravelDashboard/ExecutiveSummary";
  const options = {
    width: "1560px",
    height: "840px",
    hideToolbar: true,
    device: "desktop",
  };

  function initViz() {
    viz = new tableau.Viz(ref.current, url, options);
  }

  useEffect(() => {
    if (viz) {
      viz.dispose();
    }
    initViz();
  }, []);

  useEffect(() => {
    document.body.style = "--background-color: var(--bc-light-project-id2)";
    return () => window.scrollTo(0, 0);
  }, []);

  const filteredProject = projectIntros.find((project) => {
    return project.id === 2;
  });

  return (
    <div className="project-main-container">
      <div className="project-intro">
        <ProjectIntro project={filteredProject} />
      </div>
      <h1 className="project-content-main-title">
        SIX-STEP PROCESS OF PROCESSING DATA
      </h1>
      <p className="project-content-intro-description">
        The data underwent thorough cleaning and detailed analysis using SQL and
        Tableau, following a comprehensive six-step data processing methodology.
        This process began with ask, where key questions were identified to
        shape the direction of the analysis. Next was prepare, where relevant
        data was gathered and organized, ensuring all necessary information was
        ready for the next stages. The clean phase addressed errors and
        inconsistencies, resulting in a high-quality dataset. In the analyze
        phase, valuable insights were extracted, followed by share, where
        findings were presented in a clear, actionable format. Finally, the act
        phase focused on implementing data-driven decisions based on the results
        to drive meaningful outcomes.
      </p>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">01</div>
          <h3 className="project-content-sub-title">ASK</h3>
        </div>
      </div>
      <div className="project-content-container">
        <p className="project-content-description project-content-description-first">
          In this phase, it is essential to identify key questions that will
          shape the analysis. Since the primary objective is to reduce carbon
          emissions and promote more sustainable business travel, the focus is
          on understanding which types of travel contribute disproportionately
          to emissions. Specifically, the analysis centers on answering the
          question, “Which areas generate unnecessarily high carbon emissions?”
          Addressing this question aims to reveal patterns and insights that
          will guide the development of more sustainable travel practices and
          strategies.
        </p>
      </div>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">02</div>
          <h3 className="project-content-sub-title">PREPARE</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        First, I created a database to store the data. This database includes
        travel records from 2023 and 2024, sourced from both Egencia and
        Netsuite. Annual carbon budgets are incorporated by business unit and
        sub-unit, enabling precise emissions tracking. To support map-based
        visualization of flight routes, I joined an additional table containing
        latitude and longitude coordinates with the travel data.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlCreateDB}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        To create the data model, I’ll use a view. This approach has two
        advantages: first, it avoids using unnecessary physical storage, since a
        view doesn’t create a new physical table based on existing tables.
        Second, it ensures that the data model always reflects the latest data
        from the source tables, whereas a static table would become outdated if
        source data changes. By using a view, we address both storage efficiency
        and data freshness.
      </p>
      <p className="project-content-description">
        However, one disadvantage of using a view instead of a table is that, if
        the underlying query is complex, the view may lead to slower response
        times compared to a table, since it must reprocess the query each time
        it’s accessed. To overcome this limitation while still retaining the
        benefits mentioned earlier—namely, avoiding unnecessary physical storage
        use and keeping data up-to-date—I’ll use a materialized view. With a
        materialized view, the data is stored physically, which significantly
        boosts performance by allowing faster access without re-querying the
        source tables each time. This approach combines the efficiency of a
        traditional table with the flexibility of a view.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlDataModel}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        Once the materialized view is created, I need to configure an automatic
        data refresh using a trigger to eliminate the tedious process of
        manually refreshing the data whenever changes occur in the source
        tables.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlTriggers}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        After creating the triggers, I verify their successful creation to
        ensure they are set up correctly and functioning as intended.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlTriggersCheck}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        Now, I'm verifying that data for each year and month has loaded
        correctly to ensure completeness and accuracy.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlDateCheck}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        Next, I’m performing thorough data quality checks on the IDs to ensure
        their consistency and accuracy. This includes verifying that the length
        of each ID is consistent with the expected format, as well as checking
        for any duplicates within the dataset. These checks help ensure that
        each record is unique and properly formatted, which is essential for
        maintaining the integrity of the data and preventing potential errors
        during analysis or reporting. By identifying and addressing any issues
        with the IDs early on, I can ensure a cleaner, more reliable dataset for
        subsequent analysis.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlIDCheck}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        Next, I’m performing a comprehensive check for null values across all
        fields in the dataset. This step is crucial to ensure that no important
        data is missing, as null values can significantly impact the quality and
        accuracy of analysis. I will review each field to identify any missing
        or incomplete entries and address them accordingly, either by imputing
        the missing values, removing the affected rows, or investigating the
        source of the nulls.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlNullCheck}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        In the final step, I’m verifying the number of business units and
        sub-business units present in the dataset. This check ensures that all
        relevant units are properly represented and that no data is missing or
        incorrectly categorized. I also cross-reference the names of each
        business unit and sub-business unit to confirm that they match the
        expected naming conventions and are consistent across the dataset.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlBuCheck}
        </SyntaxHighlighter>
      </div>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">CLEAN</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        There are 4 null values in the "arrival city" and "arrival country"
        fields, so I will begin the cleaning phase by removing these records to
        ensure data accuracy. Additionally, there are 138 null values in the
        "reason for travel" field. These nulls are expected, as this data is not
        provided in the Netsuite system.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlRemoveNull}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        During the data quality check in the previous phase, I noticed that nine
        rows contain incorrect dates from the year 2025, while the data should
        only cover 2023 and 2024. To ensure the integrity of the dataset, I will
        identify these rows based on the incorrect dates and remove them from
        the dataset.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlRemoveDate}
        </SyntaxHighlighter>
      </div>
      <p className="project-content-description">
        Finally, I will clean the data for the business and sub-business units,
        as there were some incorrect entries. These errors likely stemmed from
        data insert issues, and to ensure consistency and accuracy, I will
        identify and correct these inaccuracies. This step will help maintain
        the integrity of the dataset and ensure that the business and
        sub-business units are properly represented for accurate analysis and
        reporting.
      </p>
      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlCorrectBu}
        </SyntaxHighlighter>
      </div>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">04</div>
          <h3 className="project-content-sub-title">ANALYZE</h3>
        </div>
      </div>

      <p className="project-content-description project-content-description-first">
        With the cleaned data, the analysis aimed to identify areas contributing
        disproportionately to CO₂ emissions. I began by comparing total CO₂
        emissions to the budget to assess how much of the budget has been spent.
        To gain deeper insights, I included a breakdown by flight type to
        identify if any specific flight types are contributing more
        significantly to budget overruns. A similar analysis was conducted for
        business and sub-business units to pinpoint where the highest emissions
        are coming from. Next, I focused on identifying the employees generating
        the highest CO₂ emissions. I also performed a year-over-year analysis,
        examining emissions by flight type and reason for travel. This was
        followed by a city-level analysis to identify locations with higher
        carbon footprints. Finally, I concluded the analysis with a seasonal
        breakdown to understand how emissions vary throughout the year.
      </p>

      <p className="project-content-description">
        <b>Yearly CO₂ Emissions vs. Budget Spend:</b> The analysis of yearly CO₂
        emissions versus the budget focused on determining the percentage of the
        budget used for emissions. This allowed us to assess how closely the
        emissions aligned with the allocated budget. To gain deeper insights, I
        added a breakdown by flight type to identify if any specific flight
        categories (e.g., domestic, international, long-haul) were
        disproportionately contributing to budget overruns. This step helped
        pinpoint whether certain flight types were driving higher emissions and
        exceeding the allocated carbon budget, providing valuable information
        for targeted reduction strategies.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlYearlyAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Highest CO₂ Emissions by Business Unit and Sub-Business Unit:</b> The
        analysis of budget versus emissions, broken down by business and
        sub-business units, focused on both absolute and percentage differences.
        This approach aimed to identify units that exceeded their allocated
        budgets and generated disproportionately high carbon emissions. By
        comparing the actual emissions to the budgeted amounts, the analysis
        highlighted areas where emissions were significantly above the expected
        levels, allowing for targeted interventions to reduce carbon footprints
        in these high-impact units.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlBuAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Top 10 Travelers by CO₂ Emissions:</b>
        This analysis identifies the top 10 employees who generate the highest
        carbon emissions. By adding information on the reason for travel, as
        well as the associated business and sub-business units, it becomes
        possible to pinpoint problematic areas and travel patterns that
        contribute significantly to the organization's overall carbon footprint.
        This insight allows for targeted strategies to reduce emissions among
        high-impact travelers.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlEmployeeAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Normalized CO₂ Emissions per Employee:</b>
        This analysis calculates the CO₂ emissions normalized per employee
        within each business unit and sub-business unit. By doing this, we can
        assess the carbon footprint in relation to the size of each unit,
        enabling a clearer understanding of which units are more or less
        efficient in managing their emissions per person. This insight helps in
        identifying areas where carbon reduction efforts can be more effectively
        targeted.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlEmpNormAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Year-Over-Year Analysis by Type of Flight: </b> This analysis
        examines the changes in CO₂ emissions and budget usage over the past
        year, both in percentage and absolute values, categorized by type of
        flight. By comparing data from previous years, it helps identify trends,
        shifts in emissions patterns, and highlights flight types that may
        require further attention for more sustainable practices. This enables a
        better understanding of how different flight types impact overall
        emissions year-over-year.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlTypeYearlyAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Year-Over-Year Analysis by Reason for Travel: </b> This analysis
        focuses on understanding the changes in CO₂ emissions and budget usage
        over the past year, categorized by the reason for travel. By comparing
        data from previous years, it helps identify which travel purposes
        contribute the most to emissions and budget overruns.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlReasonYearlyAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Arrival and Departure Cities with Highest CO₂ Emissions: </b> This
        analysis identifies the cities with the highest carbon emissions from
        business travel, considering both arrivals and departures. By
        pinpointing the most frequently traveled cities, the company gains a
        deeper understanding of its travel patterns and their environmental
        impact. These insights empower the company to prioritize carbon
        reduction strategies for specific routes, optimize travel decisions, and
        implement more sustainable practices, ultimately helping to reduce its
        overall carbon footprint.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlCitiesAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Top 10 Routes by CO₂ Emissions: </b> This analysis identifies the
        most frequently traveled routes based on CO₂ emissions. By incorporating
        the calculation of emissions per kilometer, it highlights inefficient
        routes that could benefit from more eco-friendly travel policies,
        enabling the company to optimize its travel strategy and reduce overall
        environmental impact.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlRoutesAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        <b>Seasonal Analysis of Budget Usage: </b> This analysis provides
        insights into the monthly trends of carbon emissions versus budget
        across different business units, helping to identify periods of high
        emissions and budget overruns.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlSeasonalAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        By focusing on these elements, the analysis aimed to generate actionable
        insights that enhance the understanding of carbon emissions within the
        company. It provided a clearer picture of emission patterns, enabling
        better decision-making. The findings are intended to support strategic
        initiatives for promoting more sustainable business travel practices.
      </p>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">05</div>
          <h3 className="project-content-sub-title">SHARE</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        After completing the analysis, the next critical step is to present the
        findings through clear and impactful data visualizations, ensuring the
        audience can easily grasp the key insights. I chose Tableau for its
        advanced capabilities, which not only enhance data visualization but
        also allow the audience to explore the data interactively. This helps
        them uncover deeper insights and understand complex patterns and trends
        with greater ease and engagement.
      </p>
      <p className="project-content-description">
        <b>
          For the best interactive experience with the Tableau dashboard, please
          open the site on a desktop. On tablets and phones, only a static
          preview image of the dashboard is available.
        </b>
      </p>
      <div className="tableau-dash" ref={ref}></div>
      <img
        src={dashboardCyclisticImg}
        alt="Sample picture of the dashboard."
        className="dashboard-img"
      />
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">06</div>
          <h3 className="project-content-sub-title">ACT</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        The final phase of the process is when the business takes action based
        on the insights gathered from the analysis. At this stage, the company
        leverages the data and findings to drive meaningful changes in their
        travel policies and practices. This step is crucial for implementing the
        strategic shifts necessary to reduce carbon emissions and move towards
        more sustainable business travel. By applying the analysis, the company
        can target specific areas identified as high carbon emitters, optimize
        travel routes, and ensure that carbon budgets are adhered to more
        effectively.
      </p>
      <p className="project-content-description">
        The goal is not just to identify issues but to translate the data into
        actionable steps that result in tangible improvements. This might
        involve adjusting travel guidelines, promoting eco-friendly flight
        options, or investing in more sustainable transportation methods. As a
        result, the business will be able to actively track progress against its
        sustainability targets, making data-driven decisions that align with
        both environmental goals and business objectives. Ultimately, this phase
        drives the continuous improvement needed for the company to operate in a
        more sustainable and environmentally responsible manner.
      </p>
    </div>
  );
};
