import React from "react";
import { projects } from "../../data";
import "./projectNetworkEdge.css";
import Project from "../../components/project/Project";

export const ProjectNetworkEdge = () => {
  const filteredProject = projects.filter((project) => {
    return project.id === 1;
  });

  return (
    <>
      <div className="project-intro">
        <Project project={filteredProject} />
      </div>
      <div className="project-content">
        <h1 className="project-content-main-title">DESIGN PROCESS</h1>
        <div className="project-content-number">01</div>
        <h3 className="project-content-sub-title">POST LAUNCH RESEARCH</h3>
        <div className="project-content-container">
          <p className="project-content-description">
            I conducted six in-depth interviews with business users. Research
            questions were framed around Data Experience (DX) Design Pillars
            i.e. purpose, information architecture, data presentation, visual
            hierarchy, interactivity, and context.
          </p>
          <h4 className="project-content-sub-sub-title">PURPOSE</h4>
          <p className="project-content-description">
            Are you able to answer your key business questions or complete
            analytical tasks with the current design? Are the outcomes
            actionable or related to a specific decision or job task?
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
            Data presentation What are the strengths and weaknesses of visual
            encoding in answering the key questions? Is any unnecessary visual
            detail included that competes for attention without adding
            significant value? How are new users supported in understanding how
            to decode the data representation?
          </p>
          <h4 className="project-content-sub-sub-title">VISUAL HIERARCHY</h4>
          <p className="project-content-description">
            Is the relative importance of each text element visually clear?
            Which sections, charts, or other elements of the viz draw your
            attention most and least? Do these correspond to the elements of the
            viz that should draw your most or least attention? Are there any
            elements that could be de-emphasized to reduce visual clutter?
          </p>
          <h4 className="project-content-sub-sub-title">INTERACTIVITY</h4>
          <p className="project-content-description">
            Can you easily discover and understand what interactive
            functionality and options are available? What are the strengths and
            weaknesses of the available interactive features? Are selections or
            other actions easy for you to reverse?
          </p>
          <h4 className="project-content-sub-sub-title">CONTEXT</h4>
          <p className="project-content-description">
            Is there meaningful context provided for accurate comparisons? For
            understanding scale & magnitude? For understanding complex KPIs or
            underlying business logic?
          </p>
          <p className="project-content-description">
            Based on the research findings I prepared insights which indicated
            problematic areas within user experience, data experience and
            overall communication with users. To each insight I provided
            recommendations and how those would translate into both, product
            design and data design. Once I reviewed the recommendations together
            with product owner I moved to the next step which was preparation of
            low fidelity mock-up.
          </p>
        </div>
      </div>
      <div className="project-content">
        <div className="project-content-number">02</div>
        <h3 className="project-content-sub-title">LOW FIDELITY PROTOTYPE</h3>
        <p className="project-content-description">
          I prepared the low-fidelity interactive prototype using Figma. The
          main goal was to translate user needs and frustrations uncovered
          during the research phase to the data design that addresses and
          resolve them. I did few iterations of the prototyping with product
          owner before moving to the next step of usability testing.
        </p>
      </div>
      <div className="project-content">
        <div className="project-content-number">03</div>
        <h3 className="project-content-sub-title">USABILITY TESTING</h3>
        <p className="project-content-description">
          I conducted usability testing with two groups of users. Those who were
          familiar with the product and already had a high understanding of the
          data, and those who never worked with the product before and didn’t
          understand the data at all.
        </p>
      </div>
      <div className="project-content">
        <div className="project-content-number">04</div>
        <h3 className="project-content-sub-title">HIGH FIDELITY PROTOTYPE</h3>
        <p className="project-content-description">
          {" "}
          In this last phase I prepared the final design using Figma. At this
          step I was mostly focused on the design itself i.e. selecting
          typography, color and contrast with an intention to drive user
          attention, assuring all visual elements are scaled and correctly
          aligned, assuring correct amount of white space, and finally using
          visual hierarchy to mimic user’s information flow.
        </p>
      </div>
    </>
  );
};
