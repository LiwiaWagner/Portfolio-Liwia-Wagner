import React, { useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dashboardCyclisticImg from "../../assets/cyclistic_dashboard_img.png";
import ProjectIntro from "../../components/projectIntro/ProjectIntro";
import { projectIntros } from "../../data/projectIntros";
import "./../../components/projectIntro/projectIntro.css";
import "../../pages/projectPage.css";
import "./projectCyclistic.css";

const { tableau } = window;
const sqlCreateTable = `CREATE TABLE t_2020_2021_2022_divvy_tripdata AS 
SELECT * FROM (
  SELECT * FROM t_2020_Q1_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_04_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_05_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_06_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_07_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_08_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_09_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_10_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_11_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2020_12_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_01_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_02_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_03_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_04_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_05_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_06_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_07_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_08_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_09_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_10_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_11_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2021_12_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_01_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_02_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_03_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_04_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_05_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_06_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_07_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_08_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_09_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_10_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_11_divvy_tripdata
  UNION ALL
  SELECT * FROM t_2022_12_divvy_tripdata
);`;
const sqlDateCheck = `SELECT 
  EXTRACT('YEAR' FROM started_at_date) AS year_test,
  EXTRACT('MONTH' FROM started_at_date) AS month_test 
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY 
  EXTRACT('YEAR' FROM started_at_date),
  EXTRACT('MONTH' FROM started_at_date);`;
const sqlIdCheck = `-- checking length of ride IDs
SELECT LENGTH(ride_id) 
FROM t_2020_2021_2022_divvy_tripdata;

-- checking the total number of rows
SELECT COUNT(*) 
FROM t_2020_2021_2022_divvy_tripdata; --14'804'382 rows

-- checking if ride IDs have any duplicate values
SELECT COUNT(DISTINCT(ride_id)) 
FROM t_2020_2021_2022_divvy_tripdata; --14'804'096`;
const sqlNullCheck = `SELECT 
  COUNT(*) - COUNT(ride_id) AS ride_id_nc, --0
  COUNT(*) - COUNT(rideable_type) AS rideable_type_nc, --0
  COUNT(*) - COUNT(started_at_date) AS started_at_date_nc, --0
  COUNT(*) - COUNT(started_at_time) AS started_at_hour_nc, --0
  COUNT(*) - COUNT(ended_at_date) AS ended_at_date_nc, --0
  COUNT(*) - COUNT(ended_at_time) AS ended_at_hour_nc, --0
  COUNT(*) - COUNT(start_station_name) AS start_station_name_nc, --1'618'518
  COUNT(*) - COUNT(start_station_id) AS start_station_id_nc, --1'619'141
  COUNT(*) - COUNT(end_station_name) AS end_station_name_nc, --1'742'780
  COUNT(*) - COUNT(end_station_id) AS end_station_id_nc, --1'743'241
  COUNT(*) - COUNT(start_lat) AS start_lat_nc, --0
  COUNT(*) - COUNT(start_lng) AS start_lng_nc, --0
  COUNT(*) - COUNT(end_lat) AS end_lat_nc, --14'884
  COUNT(*) - COUNT(end_lng) AS end_lng_nc --14'884
  COUNT(*) - COUNT(member_casual) AS member_casual_nc --0
FROM t_2020_2021_2022_divvy_tripdata;`;
const sqlStationCheck = `-- checking how many stations are there 
SELECT DISTINCT(end_station_name) AS end_station 
FROM t_2020_2021_2022_divvy_tripdata; --1730

SELECT DISTINCT(start_station_name) AS start_station 
FROM t_2020_2021_2022_divvy_tripdata; --1712

-- confirming that member type has only two values, casual and member
SELECT DISTINCT (member_casual) 
FROM t_2020_2021_2022_divvy_tripdata;`;
const sqlRemoveNull = `DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE start_station_name IS NULL;

DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE end_station_name IS NULL;

DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE start_station_id IS NULL;

DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE end_station_id IS NULL;

DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE end_lat IS NULL;

DELETE FROM t_2020_2021_2022_divvy_tripdata 
WHERE end_lng IS NULL;`;
const sqlDayMonth = `SELECT 
  ride_id,
  rideable_type,
  start_station_name, 
  end_station_name, 
  start_lat, 
  start_lng,end_lat, 
  end_lng, 
  member_casual AS member_type,
  started_at,  
  CASE     
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 1 THEN 'SUN'    
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 2 THEN 'MON'    
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 3 THEN 'TUE'    
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 4 THEN 'WED'    
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 5 THEN 'THU'    
    WHEN EXTRACT (DAYOFWEEK FROM started_at) = 6 THEN 'FRI'  
  ELSE 'SAT'  
  END AS day_of_week,  
  CASE
    WHEN EXTRACT (MONTH FROM started_at) = 1 THEN 'JAN'    
    WHEN EXTRACT (MONTH FROM started_at) = 2 THEN 'FEB'    
    WHEN EXTRACT (MONTH FROM started_at) = 3 THEN 'MAR'    
    WHEN EXTRACT (MONTH FROM started_at) = 4 THEN 'APR'  
    WHEN EXTRACT (MONTH FROM started_at) = 5 THEN 'MAY'    
    WHEN EXTRACT (MONTH FROM started_at) = 6 THEN 'JUN'    
    WHEN EXTRACT (MONTH FROM started_at) = 7 THEN 'JUL'    
    WHEN EXTRACT (MONTH FROM started_at) = 8 THEN 'AUG'  
    WHEN EXTRACT (MONTH FROM started_at) = 9 THEN 'SEP'    
    WHEN EXTRACT (MONTH FROM started_at) = 10 THEN 'OCT'    
    WHEN EXTRACT (MONTH FROM started_at) = 11 THEN 'NOV'    
    WHEN EXTRACT (MONTH FROM started_at) = 12 THEN 'DEC'  
  ELSE 'UNKOWN'  
  END AS month,  
  EXTRACT (DAY FROM started_at) AS day,  
  EXTRACT (YEAR FROM started_at) AS year,  
  TIMESTAMP_DIFF (ended_at, started_at, minute) AS ride_length_m,  
  FORMAT_TIMESTAMP("%I:%M %p", started_at) AS time
FROM t_2020_2021_2022_divvy_tripdata 
WHERE TIMESTAMP_DIFF (ended_at, started_at, minute) > 1 
AND TIMESTAMP_DIFF (ended_at, started_at, hour) < 24`;
const sqlTimeAnalysis = `-- calculate trip length in minutes
SELECT EXTRACT(EPOCH FROM (ended_at_time - started_at_time))/60 
AS trip_time_minutes 
FROM t_2020_2021_2022_divvy_tripdata;

-- add trip_time_minutes field to the table
ALTER TABLE t_2020_2021_2022_divvy_tripdata
ADD COLUMN trip_time_minutes TIME;

UPDATE t_2020_2021_2022_divvy_tripdata a
SET trip_time_minutes
= (SELECT EXTRACT(EPOCH FROM (ended_at_time - started_at_time))/60 
FROM t_2020_2021_2022_divvy_tripdata b
WHERE a.ride_id = b.ride_id);
			 
-- average trip time for all users
SELECT AVG(trip_time_minutes) AS avg_trip_time_minutes 
FROM t_2020_2021_2022_divvy_tripdata;

-- average trip time for each group member type
SELECT member_casual, AVG(trip_time_minutes) AS avg_member_trip_time
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY member_casual;

-- max time spend on trip for each group
SELECT member_casual, MAX(trip_time_minutes) AS max_member_trip_time
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY member_casual;

-- min time spend on trip for each group
SELECT member_casual, MIN(trip_time_minutes) AS min_member_trip_time
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY member_casual;`;
const sqlTripAnalysis = `-- which weekdays have most trips
SELECT TO_CHAR(started_at_date, 'DAY') AS week_day
FROM t_2020_2021_2022_divvy_tripdata;

ALTER TABLE t_2020_2021_2022_divvy_tripdata
ADD COLUMN week_day TEXT;

UPDATE t_2020_2021_2022_divvy_tripdata a
SET week_day = (SELECT TO_CHAR(started_at_date, 'DAY')
FROM t_2020_2021_2022_divvy_tripdata b
WHERE a.ride_id = b.ride_id);

SELECT 
  week_day, 
  COUNT(week_day) AS week_day_count
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY week_day;

-- per membership type
SELECT 
  week_day, 
  COUNT(week_day) AS week_day_count
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member'
GROUP BY week_day;

SELECT 
  week_day, 
  COUNT(week_day) AS week_day_count
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual'
GROUP BY week_day;

-- most popular months
SELECT EXTRACT(MONTH FROM started_at_date::date) AS month_name
FROM t_2020_2021_2022_divvy_tripdata;

SELECT 
  month_name, 
  COUNT(month_name) AS count_month_name
FROM t_2020_2021_2022_divvy_tripdata;

SELECT 
  month_name, 
  COUNT(month_name) AS count_month_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member';

SELECT 
  month_name, 
  COUNT(month_name) AS count_month_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual';

-- most popular hours
SELECT 
  EXTRACT(HOUR FROM started_at_date) AS time_of_day, 
  COUNT(*), 
  member_casual
FROM t_2020_2021_2022_divvy_tripdata
GROUP BY time_of_day, member_casual
ORDER BY time_of_day DESC;`;
const sqlStationAnalysis = `-- most popular start stations for casual riders
SELECT 
  start_station_name, 
  COUNT(*) AS rank_start_station 
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual'
GROUP BY start_station_name
ORDER BY rank_start_station

-- most popular start stations for member riders
SELECT 
  start_station_name, 
  COUNT(*) AS rank_start_station 
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member'
GROUP BY start_station_name
ORDER BY rank_start_station

-- most popular end stations for casual riders
SELECT 
  end_station_name, 
  COUNT(*) AS rank_end_station 
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual'
GROUP BY end_station_name
ORDER BY rank_end_station

-- most popular end stations for member riders
SELECT 
  end_station_name, 
  COUNT(*) AS rank_end_station 
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member'
GROUP BY end_station_name
ORDER BY rank_end_station

--  most popular routes amongst casual riders
SELECT 
  COUNT(*) AS frequency, 
  start_station_name, 
  end_station_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual'
GROUP BY start_station_name, end_station_name
ORDER BY frequency DESC;

--  most popular routes amongst member riders
SELECT 
  COUNT(*) AS frequency, 
  start_station_name, 
  end_station_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member'
GROUP BY start_station_name, end_station_name
ORDER BY frequency DESC;

--  least popular routes amongst casual riders
SELECT 
  COUNT(*) AS frequency, 
  start_station_name, 
  end_station_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'casual'
GROUP BY start_station_name, end_station_name
ORDER BY frequency ASC;

--  least popular routes amongst member riders
SELECT 
  COUNT(*) AS frequency,
  start_station_name, 
  end_station_name
FROM t_2020_2021_2022_divvy_tripdata
WHERE member_casual = 'member'
GROUP BY start_station_name, end_station_name
ORDER BY frequency ASC;`;

export const ProjectCyclistic = () => {
  let viz = window.tableau.VizManager.getVizs()[0];
  const ref = useRef(null);
  const url =
    "https://public.tableau.com/views/CyclisticCustomerBuyingBehaviourAnalysisGoogleBICertificationCapstoneProject/Dashboard";
  const options = {
    width: "1000px",
    height: "2050px",
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
    document.body.style = "--background-color: var(--bc-light-project-id4)";
    return () => window.scrollTo(0, 0);
  }, []);

  const filteredProject = projectIntros.find((project) => {
    return project.id === 4;
  });

  return (
    <div className="project-main-container project-cyclistic-intro">
      <div className="project-intro">
        <ProjectIntro projectIntro={filteredProject} />
      </div>

      <h1 className="project-content-main-title">
        GOOGLE’S SIX-STEP PROCESS OF PROCESSING DATA
      </h1>
      <p className="project-content-intro-description">
        The data was thoroughly cleaned and meticulously analyzed using SQL and
        Tableau, adhering closely to Google's comprehensive six-step data
        processing methodology, which includes the following stages: ask, where
        key questions are identified to guide the analysis; prepare, which
        involves gathering and organizing the necessary data; clean, ensuring
        the data is free of errors and inconsistencies; analyze, where insights
        are extracted through detailed examination; share, communicating the
        findings in a clear and actionable format; and act, implementing
        data-driven decisions based on the results of the analysis.
      </p>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">01</div>
          <h3 className="project-content-sub-title">ASK</h3>
        </div>
      </div>
      <div className="project-content-container">
        <p className="project-content-description">
          In this phase, it is crucial to identify the key questions that will
          shape and drive the analysis. Since Cyclistic's primary objective is
          to increase its membership base, the emphasis is placed on gaining a
          deeper understanding of customer behaviors. Specifically, the analysis
          is focused on answering a central question: “How do annual members and
          casual riders differ in their usage of Cyclistic bikes?” By exploring
          this question, the goal is to uncover patterns and insights that will
          inform strategies for converting casual riders into loyal, long-term
          members, ultimately supporting the company’s growth initiatives.
        </p>
      </div>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">02</div>
          <h3 className="project-content-sub-title">PREPARE</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first project-content-description-code">
        The data used for this analysis was gathered from datasets spanning the
        years 2020, 2021, and 2022, all of which were provided in .csv format.
        To facilitate a seamless and comprehensive analysis, SQL was employed to
        combine the separate tables into a unified dataset. This process allowed
        for the execution of exploratory queries to uncover preliminary insights
        and trends. Additionally, SQL was instrumental in performing rigorous
        quality checks, ensuring the data was accurate, complete, and ready for
        deeper analysis, thereby laying a solid foundation for drawing
        meaningful conclusions.
      </p>

      <div className="code-container">
        <div className="code-highlight-block">
          <SyntaxHighlighter
            language="sql"
            style={nord}
            showLineNumbers={true}
            className="code-highlight"
          >
            {sqlCreateTable}
          </SyntaxHighlighter>
        </div>
      </div>

      <p className="project-content-description project-content-description-code">
        After combining the data, I conducted a quick validation to confirm that
        the dataset accurately reflected records for all intended years and
        months. This involved checking for the presence of each year and month
        within the date fields to ensure that no periods were inadvertently
        missing or misrepresented. By verifying the completeness of the dataset
        at this stage, I could confidently proceed, knowing that the data
        provided a full and reliable timeline for subsequent analysis.
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

      <p className="project-content-description project-content-description-code">
        In the next phase of data preparation, I began by checking the length of
        the ride_id field to identify any irregularities or potential issues,
        such as unusually short or long identifiers, which could indicate data
        entry errors. Following this, I calculated the total number of rows in
        the dataset and compared it with the distinct count of ride_id. The fact
        that both totals matched confirmed that there were no duplicate values
        within ride_id, ensuring that each ride was uniquely identified and
        ready for analysis without redundancy concerns. This verification step
        was essential to maintain data integrity before moving forward with
        further cleaning and analysis.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlIdCheck}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description project-content-description-code">
        Next, I examined the dataset to identify the number of NULL values in
        each field, assessing their frequency across all rows. This step helped
        pinpoint fields with missing information, allowing me to address any
        gaps systematically in the next phase of cleaning. By quantifying NULL
        values per column, I could prioritize fields that required attention,
        ensuring that the data was as complete and reliable as possible for
        accurate analysis.
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

      <p className="project-content-description project-content-description-code">
        In the final phase of data preparation, I conducted checks on the number
        of unique start and end stations to verify that they matched the
        expected totals provided by the business. This comparison ensured that
        the dataset included all relevant stations and that none were missing or
        mislabeled. I applied a similar check to the membership types recorded
        in the data, confirming that the categories of users, such as members
        and casual riders, aligned with those defined by the business. These
        validation steps were essential for ensuring data completeness and
        consistency, setting a solid foundation for accurate analysis.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlStationCheck}
        </SyntaxHighlighter>
      </div>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">CLEAN</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first project-content-description-code">
        In this cleaning phase, the data was meticulously prepared to ensure
        both accuracy and suitability for in-depth analysis. Having already
        verified that the ride_id field was free of duplicates, I concentrated
        on addressing NULL values within specific, high-priority fields. By
        thoroughly reviewing these fields and removing rows containing NULL
        values, I enhanced the dataset's completeness and reliability. This
        careful cleaning process ensured that only high-quality, comprehensive
        data remained, establishing a robust foundation for accurately analyzing
        user behavior and bike usage patterns in the next phases.
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

      <p className="project-content-description project-content-description-code">
        Next, I organized the data by categorizing it into weeks and months.
        This involved creating additional fields to represent the day of the
        week and month of each ride, enabling a more detailed analysis of usage
        patterns. By breaking down the data in this way, I set up the framework
        to examine trends in bike usage across different times, helping to
        reveal insights into how and when customers—both members and casual
        riders—tend to use the service. This categorization was essential for
        identifying weekly and monthly usage behaviors, which will inform
        targeted strategies for growth.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlDayMonth}
        </SyntaxHighlighter>
      </div>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">04</div>
          <h3 className="project-content-sub-title">ANALYZE</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        With the cleaned data, the analysis focused on uncovering the unique
        usage patterns between annual members and casual riders. Key aspects
        were explored, including trip duration, ride timing, trip time analysis,
        and station popularity, to develop a comprehensive understanding of each
        group's behavior. By examining trip duration, we could determine how
        long each user type typically rode, while ride timing analysis shed
        light on popular days and times for bike usage. Trip time analysis
        offered insights into average, minimum, and maximum ride lengths, as
        well as peak hours. Finally, station popularity analysis identified the
        most and least frequented stations, providing valuable information on
        user preferences and hotspot locations. Together, these insights created
        a detailed behavioral profile of both user types, supporting data-driven
        decisions for membership growth strategies.
      </p>

      <p className="project-content-description project-content-description-code">
        <b>Trip Duration:</b>
        this analysis measured the length of each ride in both minutes and
        hours, providing insights into the typical usage time for members and
        casual riders. By comparing the average trip durations, we could
        identify differences in how each user group interacts with the
        service—for instance, whether casual riders tend to take longer or
        shorter trips compared to annual members. This metric also helped reveal
        whether there were peak ride lengths associated with each group,
        offering valuable insights into customer preferences and potential areas
        for service optimization.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlTimeAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description project-content-description-code">
        <b>Trip Time Analysis:</b>
        focused on bike usage trends across different days of the week and
        throughout the year, identifying peak usage periods and seasonal
        fluctuations. Weekly patterns from Monday through Sunday were examined
        to reveal any differences in riding habits between weekdays and
        weekends. Monthly trends for January through April were assessed to
        uncover early-year seasonal shifts. Additionally, popular hours for bike
        rides were identified, highlighting the most and least active times
        throughout the day, providing a comprehensive view of user engagement
        across various timeframes.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlTripAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description project-content-description-code">
        <b>Station Popularity: </b> this analysis identified the most and least
        popular start and end stations for both members and casual riders,
        revealing which locations experienced the highest and lowest demand.
        These insights offered valuable information for operational efficiency
        and strategic planning, helping to optimize station placement and
        resource allocation based on rider preferences and station usage
        patterns.
      </p>

      <div className="code-highlight-block">
        <SyntaxHighlighter
          language="sql"
          style={nord}
          showLineNumbers={true}
          className="code-highlight"
        >
          {sqlStationAnalysis}
        </SyntaxHighlighter>
      </div>

      <p className="project-content-description">
        By concentrating on these elements, the analysis sought to produce
        actionable insights that would deepen Cyclistic’s understanding of rider
        behaviors and preferences. These findings are intended to support
        strategic efforts to convert casual riders into long-term members,
        ultimately helping Cyclistic grow its membership base and improve
        customer engagement.
      </p>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">05</div>
          <h3 className="project-content-sub-title">SHARE</h3>
        </div>
      </div>
      <p className="project-content-description project-content-description-first">
        After completing the analysis, the next crucial step is to effectively
        share and present the findings through clear and impactful data
        visualizations, ensuring that the audience can quickly grasp the key
        insights we aim to communicate. Numerous methods are available for
        presenting data analysis results visually, including traditional tools
        like PowerPoint and Excel, as well as specialized business intelligence
        platforms. For this project, I chose to use Tableau, a robust business
        intelligence tool known for its ability to create interactive, dynamic,
        and visually appealing presentations. Tableau's advanced capabilities
        not only enhance data visualization but also allow the audience to
        explore the data directly, helping them uncover deeper insights and
        understand complex patterns and trends with greater ease and engagement.
      </p>

      <p className="project-content-description dashboard-res-note">
        For the best interactive experience with the Tableau dashboard, please
        open the site on a desktop. On tablets and phones, only a static preview
        image of the dashboard is available.
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
        The final phase involves the business taking action on the analysis
        findings and insights, using this information to implement strategic
        changes that align with identified trends and opportunities. By
        integrating data-driven insights into the business strategy, the
        organization can make informed decisions that improve operational
        efficiency, enhance customer engagement, and potentially increase
        membership conversion rates. This phase is critical, as it translates
        analysis into tangible actions that support growth and adaptability,
        ensuring the business continuously evolves based on accurate,
        evidence-backed recommendations.
      </p>
      <ul className="key-findings">
        <b>Key Findings:</b>
        <li className="key-point">
          <b>Ride Frequency by Customer Type: </b>Casual customers predominantly
          take rides on weekends, while members have higher usage during the
          weekdays, indicating different patterns in how each group engages with
          the service.
        </li>
        <li>
          <b>Trip Duration:</b> On average, members tend to take shorter rides
          compared to casual customers, suggesting that members may use the
          service more for quick, practical trips, while casual riders might use
          it for leisurely, extended rides.
        </li>
        <li>
          <b>Seasonal Trends:</b> Both members and casual riders are more active
          during the summer months, with ride frequency dropping in the late
          winter and early spring. This seasonal fluctuation highlights
          potential opportunities for targeted promotions or service adjustments
          to boost engagement during lower-demand periods.
        </li>
      </ul>
      <p className="project-content-description">
        These insights provide a clear understanding of customer behavior,
        laying the groundwork for strategies to increase member engagement and
        convert casual users into loyal members.
      </p>
      <ul className="key-findings">
        <b>Recommendations:</b>
        <li className="key-point">
          <b>Promote Membership Cost Savings:</b> Develop targeted
          advertisements highlighting how a membership can lead to cost savings,
          especially for customers who often take longer rides. Positioning the
          membership as a budget-friendly option for frequent or extended rides
          can appeal to cost-conscious casual riders, encouraging them to
          consider joining.
        </li>
        <li>
          <b>Weekend Leisure Targeting:</b> Focus marketing efforts on casual
          customers who tend to rent bikes for leisure, specifically on
          weekends. Tailored messaging that emphasizes the convenience and
          benefits of a membership for weekend activities could resonate with
          these riders, nudging them toward a commitment to Cyclistic.
        </li>
        <li>
          <b>Seasonal Summer Campaign:</b> Launch a large-scale summer campaign
          to capture the increased interest in bike rentals during the peak
          season. Consider special promotions, discounts, or unique membership
          perks that coincide with summer, when outdoor activities are at their
          height, to attract both new and returning customers.
        </li>
      </ul>
      <p className="project-content-description">
        These strategic recommendations capitalize on key insights into customer
        behavior, significantly increasing the potential to convert casual
        riders into committed members while also maximizing engagement during
        high-demand periods. By aligning promotional efforts with observed usage
        patterns, Cyclistic can tailor its approach to meet the specific needs
        and preferences of its diverse customer base, thereby fostering greater
        loyalty, improving customer retention, and driving overall growth.
      </p>
    </div>
  );
};
