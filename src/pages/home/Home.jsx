import React, { useEffect } from "react";
import "./home.css";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const getConfig = (trigger, startColor, endColor) => {
    return {
      scrollTrigger: {
        trigger: trigger,
        scrub: true,
        markers: true,
        start: "top 80%",
        end: "top 20%",
      },
      startAt: { backgroundColor: startColor },
      backgroundColor: endColor,
    };
  };

  useGSAP(() => {
    gsap
      .timeline()
      .to("body", getConfig("#one", "white", "orange"))
      .to("body", getConfig("#three", "orange", "#cd5c5c"));
  });

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
      <section id="test" style={{ margin: "800px 0" }}>
        <div id="one" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
        <div id="two" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
        <div
          id="three"
          style={{ height: 1000, borderBottom: "solid 1px" }}
        ></div>
        <div
          id="four"
          style={{ height: 1000, borderBottom: "solid 1px" }}
        ></div>
      </section>
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
