import React, { useEffect } from "react";
import "./home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <>
      <div className="hero-container">
        <h3 className="name">Hello there! I’m Liwia</h3>
        <div className="hero-intro">
          <span>
            I create interactive data visualization products that provide
            insights and help people make data driven decisions.{" "}
          </span>
          Currently Senior Business Intelligence Analyst doing research, design
          and development of finance reporting solutions at EcoVadis.
        </div>
        <div className="projects">
          <h2 className="projects-title">TOP PROJECTS</h2>
        </div>
        <div className="projects">
          <h2 className="projects-title">ALL PROJECTS</h2>
        </div>
      </div>
      <div id="view" style={{ marginTop: 1000 }}>
        VIEW
      </div>
    </>
  );
};

export default Home;
