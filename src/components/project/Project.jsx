import React from "react";
import { projects } from "./../../data";

function Project(props) {
  const project = props.project;
  return (
    <div className="main-container">
      <div className="intro-container">
        <h1 className="main-title">{projects.title}</h1>
        <div className="intro-left-container">
          {projects.introType1.title}
          {projects.introType1.paragraph}
        </div>
        <div className="intro-right-container">
          {projects.deliveryDate.title}
          {projects.deliveryDate.content}
          {projects.areasOfExpertise.title}
          {projects.areasOfExpertise.content}
          {projects.tools.title}
          {projects.tools.content}
        </div>
      </div>
      <div className="main-section-container">
        <h2 className="main-section-title">{projects.mainSectionTitle}</h2>
        <div className="section">
          <div className="section-title-header">
            <div className="section-number">{projects.sectionNumber}</div>
            <h3 className="section-title">{projects.sectionTitle}</h3>
          </div>
          <div className="section-content">
            <h4 className="sub-section-title">
              {projects.sectionContent.sectionType1.title}
            </h4>
            <p className="section-content-paragraph">
              {projects.sectionContent.sectionType1.paragraph}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
