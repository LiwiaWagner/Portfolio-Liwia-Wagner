import React from "react";
import { projects } from "../../data";
import "./projectCyclistic.css";
import "./../../components/project/project.css";
import Project from "../../components/project/Project";

export const ProjectCyclistic = () => {
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

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">CLEAN</h3>
        </div>
      </div>
      <p className="project-content-description">
        During this phase, the data was carefully prepared to ensure its
        accuracy and readiness for analysis. This involved cleaning the dataset
        by identifying and removing any NULL values and duplicates that could
        potentially skew the results. Once the data was cleaned, it was further
        categorized by key time dimensions, including weekdays and months. This
        categorization allowed for more granular analysis, making it easier to
        observe patterns in bike usage based on different days of the week and
        seasonal trends throughout the year, which is essential for
        understanding customer behavior.
      </p>

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
