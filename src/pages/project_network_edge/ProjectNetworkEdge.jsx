import React, { useEffect } from "react";
import { projects } from "../../data/data";
import "./projectNetworkEdge.css";
import "./../../components/project/project.css";
import Project from "../../components/project/Project";
import desktopImgProjectNetworkEdge from "../../assets/d_project_picture_p1.png";

export const ProjectNetworkEdge = () => {
  useEffect(() => {
    document.body.style = "--background-color: var(--bc-light-project-id1)";
    return () => window.scrollTo(0, 0);
  }, []);

  const filteredProject = projects.find((project) => {
    return project.id === 1;
  });

  return (
    <div className="project-main-container">
      <Project project={filteredProject} />

      <img
        src={desktopImgProjectNetworkEdge}
        alt="Sample pictures of data visualization project."
        className="project-img"
      />

      <h1 className="project-content-main-title">DESIGN PROCESS</h1>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">01</div>
          <h3 className="project-content-sub-title">POST LAUNCH RESEARCH</h3>
        </div>
      </div>
      <div className="project-content-container">
        <p className="project-content-description">
          I conducted six in-depth interviews with business users. Research
          questions were framed around{" "}
          <b>Data Experience (DX) Design Pillars</b> i.e. purpose, information
          architecture, data presentation, visual hierarchy, interactivity, and
          context.
        </p>
        <h4 className="project-content-sub-sub-title">PURPOSE</h4>
        <p className="project-content-description">
          Are you able to answer your key business questions or complete
          analytical tasks with the current design? Are the outcomes actionable
          or related to a specific decision or job task?
        </p>
        <h4 className="project-content-sub-sub-title">
          INFORMATION ARCHITECTURE
        </h4>
        <p className="project-content-description">
          Information flow: what steps do you need to take to answer the key
          questions or complete analytical tasks? Does navigation provide you
          the flexibility to move between different levels of overview, and
          zoom, in a way that fits well with your analytical flow? Can you
          easily understand where you are, and what information is and isn’t
          available? Can you easily scan the page and locate information
          elements?
        </p>
        <h4 className="project-content-sub-sub-title">DATA PRESENTATION</h4>
        <p className="project-content-description">
          What are the strengths and weaknesses of visual encoding in answering
          the key questions? Is any unnecessary visual detail included that
          competes for attention without adding significant value? How are new
          users supported in understanding how to decode the data
          representation?
        </p>
        <h4 className="project-content-sub-sub-title">VISUAL HIERARCHY</h4>
        <p className="project-content-description">
          Is the relative importance of each text element visually clear? Which
          sections, charts, or other elements of the viz draw your attention
          most and least? Do these correspond to the elements of the viz that
          should draw your most or least attention? Are there any elements that
          could be de-emphasized to reduce visual clutter?
        </p>
        <h4 className="project-content-sub-sub-title">INTERACTIVITY</h4>
        <p className="project-content-description">
          Can you easily discover and understand what interactive functionality
          and options are available? What are the strengths and weaknesses of
          the available interactive features? Are selections or other actions
          easy for you to reverse?
        </p>
        <h4 className="project-content-sub-sub-title">CONTEXT</h4>
        <p className="project-content-description">
          Is there meaningful context provided for accurate comparisons? For
          understanding scale & magnitude? For understanding complex KPIs or
          underlying business logic?
        </p>
        <p className="project-content-description">
          Based on the research findings I prepared insights which indicated
          problematic areas within user experience, data experience and overall
          communication with users. To each insight I provided recommendations
          and how those would translate into both, product design and data
          design. Once I reviewed the recommendations together with product
          owner I moved to the next step which was preparation of low fidelity
          mock-up.
        </p>
      </div>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">02</div>
          <h3 className="project-content-sub-title">LOW FIDELITY PROTOTYPE</h3>
        </div>
      </div>
      <p className="project-content-description">
        I prepared the low-fidelity interactive prototype using Figma. The main
        goal was to translate user needs and frustrations uncovered during the
        research phase to the data design that addresses and resolve them. I did
        few iterations of the prototyping with product owner before moving to
        the next step of usability testing.
      </p>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">USABILITY TESTING</h3>
        </div>
      </div>

      <p className="project-content-description">
        I conducted usability testing with two user groups: those already
        familiar with the product and well-versed in the data, and those who had
        never used the product before and had no understanding of the data. I
        measured how long it took each group to find the requested information
        and whether there were any significant differences in their speed. The
        final design decision was based on which data visualization helped users
        retrieve the required information more efficiently.
      </p>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">04</div>
          <h3 className="project-content-sub-title">HIGH FIDELITY PROTOTYPE</h3>
        </div>
      </div>

      <p className="project-content-description">
        In the final phase, I created the application's design using Figma. My
        focus at this stage was primarily on the visual aspects, including
        selecting typography, colors, and contrast to guide user attention. I
        ensured that all elements were properly scaled and aligned, maintained
        the right amount of white space, and used visual hierarchy to reflect
        the user's information flow.
      </p>
    </div>
  );
};
