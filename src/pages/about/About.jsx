import React from "react";
import "./about.css";

const About = () => {
  return (
    <main className="about-main-container">
      <article className="article-main grid-col-span-8">
        <h1>Hello there! I’m Liwia</h1>
        <p>
          I am a data visualization designer and developer with a strong
          technical background. Born and raised in the small town of Żyrardów in
          central Poland, I now live and work in Warsaw. From a young age, I
          dreamed of studying and living abroad. At 25, I left everything I knew
          and moved to Denmark to attend business school. Along the way, I lived
          in the United States and South Africa before ultimately returning to
          Poland, as there's no place like home. I discovered my passion for
          data visualization during my first job, where I prepared reports and
          presentations for business reviews. I vividly remember the
          satisfaction of transforming complex, cluttered data into clear,
          meaningful visualizations. It was then that I realized my love for
          making data make sense.
        </p>
      </article>
      <img
        className="grid-col-span-4"
        src="../asstes/profile.jpeg"
        alt="The author stands surrunded by early autumn mountains."
      />
      <article className="article-skills grid-col-span-3">
        <h6>SKILLS</h6>
        <p>
          Data Visualization Design | Dashboard Design | Dara Analysis |UX/UI
          Design | DX Research | User Reasarch | Data Modeling | Data Processing
        </p>
      </article>
      <article className="article-tools grid-col-span-3">
        <h6>TOOLS & LANGUAGES</h6>
        <p>
          SQL | HTML/CSS | JavaScript | React.js | d3.js | Tableau | Mapbox |
          Figma
        </p>
      </article>
      <article className="article-social grid-col-span-2">
        <h6>SOCIAL MEDIA</h6>
        <p>
          <a href="https://github.com/LiwiaWagner">GitHub</a>
          <a href="https://public.tableau.com/app/profile/liwia2886">
            Tableau Public
          </a>
          <a href="https://observablehq.com/@liwiawagner?tab=profile">
            Observable
          </a>
          <a href="https://www.linkedin.com/in/liwia-wagner-01615020/">
            LinkedIn
          </a>
          <a href="https://x.com/liwia_wagner">X Platform</a>
        </p>
      </article>
    </main>
  );
};

export default About;
