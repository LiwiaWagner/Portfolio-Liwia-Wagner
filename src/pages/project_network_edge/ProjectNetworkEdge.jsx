import React, { useEffect } from "react";
import desktopImgProjectNetworkEdge from "../../assets/d_project_picture_p1.png";
import ProjectIntro from "../../components/projectIntro/ProjectIntro";
import { projectIntros } from "../../data/projectIntros";
import "./../../components/projectIntro/projectIntro.css";
import "../../pages/projectPage.css";
import "./projectNetworkEdge.css";

export const ProjectNetworkEdge = () => {
  useEffect(() => {
    document.body.style = "--background-color: var(--bc-light-project-id1)";
    return () => window.scrollTo(0, 0);
  }, []);

  const filteredProject = projectIntros.find((project) => {
    return project.id === 1;
  });

  return (
    <div className="project-main-container project-network-edge-intro">
      <ProjectIntro projectIntro={filteredProject} />

      <img
        src={desktopImgProjectNetworkEdge}
        alt="Sample pictures of data visualization project."
        className="project-img"
      />

      <h1 className="project-content-main-title">Design Process</h1>
      <div className="project-container-sub-title-grid">
        <div className="project-ne-container-sub-title">
          <div className="project-content-number">01</div>
          <h3 className="project-content-sub-title">POST LAUNCH RESEARCH</h3>
        </div>
      </div>
      <div className="project-content-container">
        <p className="project-ne-content-description">
          I conducted in-depth interviews with business users to gather detailed
          insights into their needs and preferences. The research questions for
          these interviews were carefully structured around
          <b> The Data Experience (DX) Six Design Pillars</b> i.e. purpose,
          information architecture, data presentation, visual hierarchy,
          interactivity, and context.
        </p>
        <p className="project-ne-content-description">
          These pillars served as a framework to explore how users interact with
          data and what design elements contribute to a better user experience.
          For each pillar, I designed specific questions to uncover pain points,
          usability challenges, and opportunities for improvement. This approach
          ensured a comprehensive understanding of user requirements and guided
          the development of solutions tailored to their needs.
        </p>

        <h4 className="project-content-sub-sub-title">01 PURPOSE</h4>
        <p className="project-ne-content-description">
          <ul>
            <li> What primary goals do you hope to achieve with this data?</li>
            <li>
              Are you able to answer your key business questions or complete
              analytical tasks with the current design?
            </li>
            <li>
              Are the outcomes actionable or related to a specific decision or
              job task?
            </li>
          </ul>
        </p>
        <h4 className="project-content-sub-sub-title">
          02 INFORMATION ARCHITECTURE
        </h4>
        <p className="project-ne-content-description">
          <ul>
            <li>
              Are there any difficulties in locating the information you need?
            </li>
            <li>
              What steps do you need to take to answer the key questions or
              complete analytical tasks?
            </li>
            <li>
              Does navigation provide you the flexibility to move between
              different levels of overview, and zoom, in a way that fits well
              with your analytical flow?
            </li>
            <li>
              Can you easily understand where you are, and what information is
              and isn’t available?
            </li>
            <li>
              Can you easily scan the page and locate information elements?
            </li>
          </ul>
        </p>
        <h4 className="project-content-sub-sub-title">03 DATA PRESENTATION</h4>
        <p className="project-nee-content-description">
          <ul>
            <li>
              What are the strengths and weaknesses of visual encoding in
              answering the key questions?
            </li>
            <li>
              Is any unnecessary visual detail included that competes for
              attention without adding significant value?
            </li>
            <li>
              How are new users supported in understanding how to decode the
              data representation?
            </li>
          </ul>
        </p>
        <h4 className="project-content-sub-sub-title">04 VISUAL HIERARCHY</h4>
        <p className="project-ne-content-description">
          <ul>
            <li>Can you quickly identify the most important information?</li>
            <li>Do you find any areas visually overwhelming or unclear?</li>
            <li>
              Which sections, charts, or other elements of the viz draw your
              attention most and least? Do these correspond to the elements of
              the viz that should draw your most or least attention?
            </li>
            <li>
              Are there any elements that could be de-emphasized to reduce
              visual clutter?
            </li>
          </ul>
        </p>
        <h4 className="project-content-sub-sub-title">05 INTERACTIVITY</h4>
        <p className="project-ne-content-description">
          <ul>
            <li>
              Can you easily discover and understand what interactive
              functionality and options are available?
            </li>
            <li>
              Are the interactive elements (e.g., filters, drill-downs) easy to
              use?
            </li>
            <li>
              What are the strengths and weaknesses of the available interactive
              features?
            </li>
            <li>Are selections or other actions easy for you to reverse?</li>
          </ul>
        </p>
        <h4 className="project-content-sub-sub-title">06 CONTEXT</h4>
        <p className="project-ne-content-description">
          <ul>
            <li>
              Is there meaningful context provided for accurate comparisons? For
              understanding scale & magnitude? For understanding complex KPIs or
              underlying business logic?
            </li>
            <li>
              Does the data provide sufficient context to understand its
              significance?
            </li>
            <li>
              Are there additional details or explanations you’d like to see
              included?
            </li>
          </ul>
        </p>
        <p className="project-content-description">
          Based on the research findings, I compiled insights highlighting key
          problem areas in user experience, data experience, and overall
          communication with users. For each insight, I provided actionable
          recommendations, detailing how these could be translated into both
          product design and data design improvements. After reviewing these
          recommendations with the product owner to ensure alignment with
          project goals, I proceeded to the next step: creating a low-fidelity
          mockup to visualize and implement the proposed solutions.
        </p>
      </div>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">02</div>
          <h3 className="project-content-sub-title">LOW FIDELITY PROTOTYPE</h3>
        </div>
      </div>
      <p className="project-content-description">
        I created a low-fidelity prototype using Figma, focusing on translating
        the user needs and frustrations identified during the research phase
        into a design that effectively addresses and resolves these issues. This
        prototype served as an early-stage visualization of the data experience,
        allowing stakeholders to see how user feedback was being incorporated.
        My primary goal was to ensure the design aligned with user expectations
        while addressing pain points uncovered during interviews.
      </p>
      <p className="project-content-description">
        To refine the prototype, I collaborated closely with the product owner,
        conducting several iterations to improve the design based on their input
        and ensuring it met both user and business requirements. These iterative
        sessions allowed us to identify potential areas of improvement early,
        saving time and effort in later stages. Once we reached a version that
        balanced user needs and project goals, we proceeded to the next phase of
        usability testing to validate the prototype's effectiveness and gather
        further feedback for fine-tuning the final design.
      </p>
      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">03</div>
          <h3 className="project-content-sub-title">USABILITY TESTING</h3>
        </div>
      </div>

      <p className="project-content-description">
        I conducted usability testing with two distinct user groups to evaluate
        the effectiveness of the design and ensure it met the needs of both
        experienced and new users. The first group consisted of users who were
        already familiar with the product and had a strong understanding of the
        data, while the second group included individuals who had never used the
        product and had no prior exposure to the data. This division allowed me
        to assess the design's usability from multiple perspectives, ensuring it
        could accommodate both seasoned users and newcomers.
      </p>
      <p className="project-content-description">
        During the testing, I measured how long it took each group to locate
        specific pieces of information within the design and noted any
        significant differences in their speed and accuracy. Additionally, I
        observed their interactions to identify any areas of confusion or
        inefficiency. Feedback from both groups provided valuable insights into
        how intuitive the design was and whether the data visualizations were
        accessible to users with varying levels of familiarity.
      </p>
      <p className="project-content-description">
        The final design decision was informed by these findings, prioritizing
        the data visualization methods that enabled all users to retrieve the
        required information more quickly and effectively. This approach ensured
        the design was user-friendly and inclusive, supporting a seamless
        experience for diverse audiences.
      </p>

      <div className="project-container-sub-title-grid">
        <div className="project-container-sub-title">
          <div className="project-content-number">04</div>
          <h3 className="project-content-sub-title">HIGH FIDELITY PROTOTYPE</h3>
        </div>
      </div>

      <p className="project-content-description">
        In the final phase, I designed the application's interface using Figma,
        focusing on creating a visually appealing and user-friendly experience.
        This stage involved carefully selecting typography, colors, and contrast
        to effectively guide user attention and enhance readability. I ensured
        that each element was properly scaled and aligned to maintain a clean
        and professional layout, paying close attention to detail to achieve a
        cohesive design.
      </p>
      <p className="project-content-description">
        Additionally, I emphasized the importance of white space, balancing the
        visual elements to avoid clutter and make the interface intuitive and
        easy to navigate. By applying principles of visual hierarchy, I
        structured the design to reflect the natural flow of information,
        directing users seamlessly through their tasks and helping them
        prioritize key data. This approach ensured the application’s design was
        not only aesthetically pleasing but also functionally optimized to meet
        user needs.
      </p>
      <div className="content-separator"></div>
      <p className="project-content-description">
        The final design, along with the research findings, was presented to the
        product owner and leadership team for their review and evaluation.
        During this presentation, I highlighted key insights and design
        decisions, providing a comprehensive overview of the user experience
        improvements and data visualizations. The leadership team and product
        owner assessed the proposed solutions to determine their alignment with
        business goals and user needs. Based on this evaluation, they began
        planning the next steps for implementing the development phase, ensuring
        that the design was ready for execution and integration into the product
        roadmap.
      </p>
    </div>
  );
};
