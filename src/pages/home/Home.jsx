import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./home.css";
import "../../components/card/card.css";
import { cards } from "./../../data";
import Card from "../../components/card/Card";

const getConfig = (trigger, startColor, endColor) => {
  return {
    scrollTrigger: {
      trigger: trigger,
      scrub: true,
      markers: true,
      start: "top 95%",
      end: "top 20%",
    },
    startAt: { backgroundColor: startColor, "--background-color": startColor },
    backgroundColor: endColor,
    "--background-color": endColor,
  };
};

const violet = "#D8D6E8";

const Home = () => {
  const topCards = cards.filter((card) => [1].includes(card.id));
  const orderedCards = [...cards].sort((a, b) => a.order - b.order);

  useGSAP(() => {
    gsap
      .timeline()
      .set("body", {
        backgroundColor: "#E0D5DC",
        "--background-color": "#E0D5DC",
      })
      .to("body", getConfig("#one", "#E0D5DC", "#D8D6E8"))
      .to("body", getConfig("#two", "#D8D6E8", "#E9EEF0"))
      .to("body", getConfig("#three", "#E9EEF0", "#EFEEF8"))
      .to("body", getConfig("#four", "#EFEEF8", "#EFEEF8"));
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
      <div className="hero">
        <div className="hero-container">
          <h3 className="name">Hello there! I’m Liwia</h3>
          <div className="hero-intro">
            <span>
              I create interactive data visualization products that provide
              insights and help people make data driven decisions.{" "}
            </span>
            Currently Senior Business Intelligence Analyst doing research,
            design and development of finance reporting solutions at EcoVadis.
          </div>
        </div>
      </div>

      <div>
        <h2 className="projects-title">TOP PROJECTS</h2>
      </div>
      <section className="project-container top-projects-container">
        {topCards.map((card, index) => (
          <Card key={index} card={card} hasHtmlId={false} />
        ))}
      </section>

      <div className="carousel"></div>

      <div className="img-container-test"></div>

      <div id="view">
        <div>
          <h2 className="projects-title">ALL PROJECTS</h2>
        </div>
        <div className="filters"></div>
        <section className="project-container all-projects-container">
          {orderedCards.map((card, index) => (
            <Card key={index} card={card} hasHtmlId={true} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
