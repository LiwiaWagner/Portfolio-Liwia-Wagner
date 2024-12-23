import React, { useEffect } from "react";
import "./about.css";

const About = () => {
  useEffect(() => {
    document.body.style = "--background-color: var(--background-color-about)";
    return () => window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-main-container">
      <article className="article-main">
        <h1 className="article-main-title">
          <p>Hello there!</p>
          <p> I’m Liwia</p>
        </h1>

        <p className="article-main-p-1">
          I am a data visualization designer and developer with a strong
          technical background. Born and raised in the small town of Żyrardów in
          central Poland, I now live and work in Warsaw.
        </p>

        <p className="article-main-p-2">
          From a young age, I dreamed of studying and living abroad. At 25, I
          left everything I knew and moved to Denmark to attend business school.
          Along the way, I lived in the United States and South Africa before
          ultimately returning to Poland, becasue there's no place like home.
        </p>
      </article>

      <article className="article-main-bottom">
        <p>
          I discovered my passion for data visualization during my first job,
          where I prepared reports and presentations for business reviews. I
          vividly remember the satisfaction of transforming complex, cluttered
          data into clear, meaningful visualizations. It was then that I
          realized my love for making data make sense.
        </p>
      </article>
      <div className="img-container"></div>
      <article className="article-skills">
        <h6 className="article-sub-title">SKILLS</h6>
        <p>
          Data Modelling + Data Processing + Data Analysis + Data Visualization
          Design + Dashboard Design + Product Design + UX/UI Design + Data
          Experience (DX) Research
        </p>
      </article>
      <article className="article-tools">
        <h6 className="article-sub-title">TOOLS & LANGUAGES</h6>
        <p>
          SQL + TypeScript + JavaScript + HTML/CSS + Next.js + React.js + d3.js
          + Tableau + Figma + Mapbox + Tailwind + Tremor
        </p>
      </article>
      <article className="article-social">
        <h6 className="article-sub-title">SOCIAL MEDIA</h6>
        <p>
          <a
            href="https://github.com/LiwiaWagner"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://public.tableau.com/app/profile/liwia2886"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tableau Public
          </a>
          <a
            href="https://observablehq.com/@liwiawagner?tab=profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Observable
          </a>
          <a
            href="https://www.linkedin.com/in/liwia-wagner-01615020/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/liwia_wagner"
            target="_blank"
            rel="noopener noreferrer"
          >
            X Platform
          </a>
        </p>
      </article>
    </main>
  );
};

export default About;
