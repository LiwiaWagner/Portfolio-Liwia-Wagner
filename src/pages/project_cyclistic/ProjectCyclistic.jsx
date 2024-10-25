import React, { useEffect } from "react";
import { projects } from "../../data/data";
import "./projectCyclistic.css";
import "./../../components/project/project.css";
import Project from "../../components/project/Project";

export const ProjectCyclistic = () => {
  useEffect(() => {
    document.body.style = "--background-color: var(--bc-light-project-id4)";
    return () => window.scrollTo(0, 0);
  }, []);

  const filteredProject = projects.filter((project) => {
    return project.id === 1;
  });

  return (
    <div className="project-main-container">
      <div className="project-intro">
        <Project project={filteredProject} />

        <h1 className="main-title">
          Cyclistic Case Study: A Capstone Project for Google BI Certification
        </h1>

        <div className="intro-left-container-type1">
          <div className="intro-section">
            <p className="intro-description">
              The capstone project of preparing Cyclistic’s customer analysis
              serves as the final assignment for the Google Business
              Intelligence Professional Certification. In this case, I assume
              the role of a Junior Data Analyst at the fictional bike-share
              company, Cyclistic. In 2016, Cyclistic launched a successful
              bike-share offering with a fleet of 5,824 bicycles tracked and
              locked into a network of 692 stations across Chicago.
            </p>
            <p className="intro-description">
              The bikes can be unlocked from one station and returned to any
              other station in the system at any time. Riders with an annual
              subscription are called members, while riders using single-ride or
              full-day passes are considered casual riders.
            </p>
            <p className="intro-description">
              The director of marketing aims to maximize the number of annual
              memberships, as they are more profitable than single-ride or
              full-day passes. This strategy is believed to be key to future
              growth. The primary goal of the analysis is to understand the
              behaviors of Cyclistic’s two main user groups: members and casual
              riders.
            </p>
          </div>
        </div>
        {/* <div className="intro-left-container-type2"></div> */}
        <div className="intro-right-container">
          <div className="intro-section">
            <h3 className="intro-sub-title">AREAS OF EXPERTISE</h3>
            <p className="intro-description">
              Data Analysis + Data Viz Design + Data Modelling + Data Processing
            </p>
          </div>
          <div className="intro-section">
            <h3 className="intro-sub-title">TOOLS & PROGRAMMING LANGUAGES</h3>
            <p className="intro-description">Tableau + Mapbox + SQL</p>
          </div>{" "}
          <div className="intro-section">
            <h3 className="intro-sub-title">DELIVERY DATE</h3>
            <p className="intro-description">May 2023</p>
          </div>
        </div>
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
      <p className="project-content-description">
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

      {/* <pre>
        <code>
          CREATE TABLE t_2020_2021_2022_divvy_tripdata AS SELECT * FROM ( SELECT
          * FROM t_2020_Q1_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_04_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_05_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_06_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_07_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_08_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_09_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_10_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_11_divvy_tripdata UNION ALL SELECT * FROM
          t_2020_12_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_01_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_02_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_03_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_04_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_05_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_06_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_07_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_08_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_09_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_10_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_11_divvy_tripdata UNION ALL SELECT * FROM
          t_2021_12_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_01_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_02_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_03_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_04_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_05_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_06_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_07_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_08_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_09_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_10_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_11_divvy_tripdata UNION ALL SELECT * FROM
          t_2022_12_divvy_tripdata );
        </code>
      </pre> */}
      <p className="project-content-description">
        After combining the data, I conducted a quick validation to confirm that
        the dataset accurately reflected records for all intended years and
        months. This involved checking for the presence of each year and month
        within the date fields to ensure that no periods were inadvertently
        missing or misrepresented. By verifying the completeness of the dataset
        at this stage, I could confidently proceed, knowing that the data
        provided a full and reliable timeline for subsequent analysis.
      </p>
      {/* <pre>
        <code>
          SELECT EXTRACT('YEAR' FROM started_at_date) AS year_test,
          EXTRACT('MONTH' FROM started_at_date) AS month_test FROM
          t_2020_2021_2022_divvy_tripdata GROUP BY EXTRACT('YEAR' FROM
          started_at_date), EXTRACT('MONTH' FROM started_at_date);
        </code>
      </pre> */}
      <p className="project-content-description">
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
      {/* <pre>
        <code>
          -- checking length of ride IDs SELECT LENGTH(ride_id) FROM
          t_2020_2021_2022_divvy_tripdata; -- checking the total number of rows
          SELECT COUNT(*) FROM t_2020_2021_2022_divvy_tripdata; --14'804'382
          rows -- checking if ride IDs have any duplicate values SELECT
          COUNT(DISTINCT(ride_id)) FROM t_2020_2021_2022_divvy_tripdata;
          --14'804'096
        </code>
      </pre> */}

      <p className="project-content-description">
        Next, I examined the dataset to identify the number of NULL values in
        each field, assessing their frequency across all rows. This step helped
        pinpoint fields with missing information, allowing me to address any
        gaps systematically in the next phase of cleaning. By quantifying NULL
        values per column, I could prioritize fields that required attention,
        ensuring that the data was as complete and reliable as possible for
        accurate analysis.
      </p>
      {/* <pre>
        <code>
          SELECT COUNT(*) - COUNT(ride_id) AS ride_id_count, --0 COUNT(*) -
          COUNT(rideable_type) AS rideable_type_count, --0 COUNT(*) -
          COUNT(started_at_date) AS started_at_date_count, --0 COUNT(*) -
          COUNT(started_at_time) AS started_at_hour_count, --0 COUNT(*) -
          COUNT(ended_at_date) AS ended_at_date_count, --0 COUNT(*) -
          COUNT(ended_at_time) AS ended_at_hour_count, --0 COUNT(*) -
          COUNT(start_station_name) AS start_station_name_count, --1'618'518
          COUNT(*) - COUNT(start_station_id) AS start_station_id_count,
          --1'619'141 COUNT(*) - COUNT(end_station_name) AS
          end_station_name_count, --1'742'780 COUNT(*) - COUNT(end_station_id)
          AS end_station_id_count, --1'743'241 COUNT(*) - COUNT(start_lat) AS
          start_lat_count, --0 COUNT(*) - COUNT(start_lng) AS start_lng_count,
          --0 COUNT(*) - COUNT(end_lat) AS end_lat_count, --14'884 COUNT(*) -
          COUNT(end_lng) AS end_lng_count, --14'884 COUNT(*) -
          COUNT(member_casual) AS member_casual_count --0 FROM
          t_2020_2021_2022_divvy_tripdata;
        </code>
      </pre> */}

      <p className="project-content-description">
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
      {/* <pre>
        <code>
          -- checking how many stations are there SELECT
          DISTINCT(end_station_name) AS end_station FROM
          t_2020_2021_2022_divvy_tripdata; --1730 SELECT
          DISTINCT(start_station_name) AS start_station FROM
          t_2020_2021_2022_divvy_tripdata; --1712 -- confirming that member type
          has only two values, casual and member SELECT DISTINCT (member_casual)
          FROM t_2020_2021_2022_divvy_tripdata;
        </code>
      </pre> */}

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">CLEAN</h3>
        </div>
      </div>
      <p className="project-content-description">
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

      {/* <pre>
        <code>
          -- removing NULL values DELETE FROM t_2020_2021_2022_divvy_tripdata
          WHERE start_station_name IS NULL; DELETE FROM
          t_2020_2021_2022_divvy_tripdata WHERE end_station_name IS NULL; DELETE
          FROM t_2020_2021_2022_divvy_tripdata WHERE start_station_id IS NULL;
          DELETE FROM t_2020_2021_2022_divvy_tripdata WHERE end_station_id IS
          NULL; DELETE FROM t_2020_2021_2022_divvy_tripdata WHERE end_lat IS
          NULL; DELETE FROM t_2020_2021_2022_divvy_tripdata WHERE end_lng IS
          NULL;
        </code>
      </pre> */}

      <p className="project-content-description">
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
      {/* <pre>
        <code>
        SELECT  ride_id,rideable_type,start_station_name, end_station_name, start_lat, start_lng,end_lat, 
        end_lng, member_casual AS member_type,started_at,  
        CASE     
		WHEN EXTRACT (DAYOFWEEK FROM started_at) = 1 THEN 'SUN'    
        WHEN EXTRACT (DAYOFWEEK FROM started_at) = 2 THEN 'MON'    
        WHEN EXTRACT (DAYOFWEEK FROM started_at) = 3 THEN 'TUE'    
        WHEN EXTRACT (DAYOFWEEK FROM started_at) = 4 THEN 'WED'    
        WHEN EXTRACT (DAYOFWEEK FROM started_at) = 5 THEN 'THU'    
        WHEN EXTRACT (DAYOFWEEK FROM started_at) = 6 THEN 'FRI'  
        ELSE 'SAT' END AS day_of_week,  
		CASE   
         WHEN EXTRACT (MONTH FROM started_at) = 1 THEN 'JAN'    
         WHEN EXTRACT (MONTH FROM started_at) = 2 THEN 'FEB'    
         WHEN EXTRACT (MONTH FROM started_at) = 3 THEN 'MAR'    
         WHEN EXTRACT (MONTH FROM started_at) = 4 THEN 'APR'  
         ELSE 'UNKOWN'  END AS month,  EXTRACT (DAY FROM started_at) AS day,  
         EXTRACT (YEAR FROM started_at) AS year,  
         TIMESTAMP_DIFF (ended_at, started_at, minute) AS ride_length_m,  
         FORMAT_TIMESTAMP("%I:%M %p", started_at) AS time
         FROM  t_2020_2021_2022_divvy_tripdata
         WHERE TIMESTAMP_DIFF (ended_at, started_at, minute) > 1 
         AND TIMESTAMP_DIFF (ended_at, started_at, hour) < 24
        </code>
      </pre> */}

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">04</div>
          <h3 className="project-content-sub-title">ANALYZE</h3>
        </div>
      </div>
      <p className="project-content-description">
        With the cleaned data, the analysis concentrated on uncovering the
        distinct usage patterns between annual members and casual riders.
        Several key aspects were analyzed to gain a comprehensive understanding
        of their behavior:
      </p>
      <ol className="project-content-list">
        <li>
          <b>Trip Duration:</b> This involved measuring the length of rides in
          both minutes and hours, offering insights into how long members and
          casual riders typically use the bikes.
        </li>
        <li>
          <b>Ride Timing:</b> Trends in bike usage were analyzed across
          different days of the week and throughout the year, helping to
          identify patterns such as peak usage periods and seasonal
          fluctuations.
        </li>
        <li>
          <b>Trip Time Analysis:</b>
          <ul>
            <li>
              Average, minimum, and maximum ride lengths were calculated to
              understand the range of trip durations.
            </li>
            <li>
              Weekly usage patterns were examined, from Monday through Sunday,
              to determine whether there were differences in riding habits
              between weekdays and weekends.
            </li>
            <li>
              Monthly usage trends were assessed for January through April to
              uncover any early-year seasonal effects or shifts in usage.
            </li>
            <li>
              Popular hours for bike rides were identified to reveal the most
              and least active times for bike usage throughout the day.
            </li>
          </ul>
        </li>
        <li>
          <b>Station Popularity:</b> The analysis also included determining the
          most and least popular start and end stations for both members and
          casual riders, highlighting which locations saw the highest and lowest
          demand, and providing valuable information for operational and
          strategic planning.
        </li>
      </ol>
      <p className="project-content-description">
        By focusing on these elements, the analysis aimed to generate actionable
        insights to enhance Cyclistic's understanding of its riders and support
        efforts to convert casual riders into members.
      </p>

      <pre>
        <code></code>
      </pre>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">05</div>
          <h3 className="project-content-sub-title">SHARE</h3>
        </div>
      </div>
      <p className="project-content-description"></p>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">06</div>
          <h3 className="project-content-sub-title">ACT</h3>
        </div>
      </div>
      <p className="project-content-description"></p>
    </div>
  );
};
