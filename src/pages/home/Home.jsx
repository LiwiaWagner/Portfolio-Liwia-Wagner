import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./home.css";
import "../../components/card/card.css";
import "./../../data";
import desktopImgCard1 from "../../assets/d_card_picture_p1.png";
import mobileImgCard1 from "../../assets/m_card_picture_p1.png";
import desktopImgCard2 from "../../assets/d_card_picture_p2.png";
import mobileImgCard2 from "../../assets/m_card_picture_p2.png";
import desktopImgCard3 from "../../assets/d_card_picture_p3.png";
import mobileImgCard3 from "../../assets/m_card_picture_p3.png";
import desktopImgCard4 from "../../assets/d_card_picture_p4.png";
import mobileImgCard4 from "../../assets/m_card_picture_p4.png";
import Card from "../../components/card/Card";

const getConfig = (trigger, startColor, endColor) => {
  return {
    scrollTrigger: {
      trigger: trigger,
      scrub: true,
      markers: false,
      start: "top 80%",
      end: "top 20%",
    },
    startAt: { backgroundColor: startColor, "--background-color": startColor },
    backgroundColor: endColor,
    "--background-color": endColor,
  };
};

const Home = () => {
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
      <div id="test" className="hero">
        <div id="one" className="hero-container">
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
      <section className="projects-container top-projects-container">
        <div id="two" className="project-container top-project-container-1">
          <article className="card-container-left">
            {cards
              .filter((card) => (card.id = 1))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </article>
          {/* <article className="card-container-right">
            <Card
              title={cards[0].title}
              description={cards[0].description}
              tools={cards[0].tools}
              img_desktop={cards[0].img_desktop}
              img_mobile={cards[0].img_mobile}
            />
          </article> */}
        </div>
        <div id="three" className="project-container top-project-container-2">
          <article className="card-container-left">
            {cards
              .filter((card) => (card.id = 2))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </article>
        </div>
        <div id="four" className="project-container top-project-container-3">
          <article className="card-container-right">
            {cards
              .filter((card) => (card.id = 3))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </article>
        </div>
      </section>

      <div className="carousel"></div>

      <div>
        <h2 className="projects-title">ALL PROJECTS</h2>
      </div>
      <section className="projects-container all-projects-container">
        <div id="two" className="project-container">
          <div className="card-container-right">
            {cards
              .filter((card) => (card.id = 2))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </div>
        </div>
        <div id="three" className="project-container">
          <div className="card-container-left">
            {cards
              .filter((card) => (card.id = 4))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </div>
        </div>
        <div id="four" className="project-container">
          <div className="card-container-right">
            {cards
              .filter((card) => (card.id = 3))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </div>
        </div>
        <div id="four" className="project-container">
          <div className="card-container-right">
            {cards
              .filter((card) => (card.id = 1))
              .map((card, index) => (
                <Card key={index} card={card} />
              ))}
          </div>
        </div>
      </section>

      <div id="view" style={{ marginTop: 1000 }}>
        VIEW
      </div>
    </>
  );
};

export default Home;

const cards = [
  {
    id: 1,
    title: "Business Application for Supply Chain Optimization",
    description: `I used Figma to design a digital solution that addressed a client’s data experience challenges, focusing on optimizing their supply chain network. Over an eight-week period, I conducted extensive Data Experience (DX) research, which informed the design and prototyping of a business application aimed at streamlining and enhancing the efficiency of their operations.`,
    tools:
      "Figma + DX Research + Data Viz Design + Product Design + UX/UI Design",
    img_desktop: (
      <img
        src={desktopImgCard1}
        alt="Sample pictures of data visualization project."
      />
    ),
    img_mobile: (
      <img
        src={mobileImgCard1}
        alt="Sample pictures of data visualization project."
      />
    ),
  },
  //   {
  //     id: 2,
  //     title: "Sustainable Travel: Company’s Carbon Emission Analysis",
  //     description:
  //       "A Tableau dashboard has been created to enable companies to track the carbon emissions generated by business flight travel. This dashboard allows companies to identify problematic areas within their organization that contribute to the highest carbon emissions. Based on these insights, companies can plan effective carbon reduction strategies.",
  //     tools: "Tableau + SQL + Data Viz Design + Data Modelling + Data Processing",
  //     img_desktop: (
  //       <img
  //         src={desktopImgCard2}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //     img_mobile: (
  //       <img
  //         src={mobileImgCard2}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     title: "Iris Species: Charting for Multiple Measures",
  //     description:
  //       "The private project focused on visualizing the Iris Species dataset. To analyze the main metrics, I used scatterplot matrix and parallel coordinates charts. While these types of visualizations are not commonly used in business reporting, they are frequently employed in the statistical field.",
  //     tools: "d3.js + Data Viz Design",
  //     img_desktop: (
  //       <img
  //         src={desktopImgCard3}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //     img_mobile: (
  //       <img
  //         src={mobileImgCard3}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //   },
  //   {
  //     id: 4,
  //     title: `Google BI Certificate:
  //     Cyclistic Capstone Project`,
  //     description:
  //       "The capstone project of preparing Cyclistic’s customer analysis serves as final assignment for Google Business Intelligence Professional Certification.",
  //     tools: "Tableau + Mapbox + SQL + Data Analysis + Data Viz Design",
  //     img_desktop: (
  //       <img
  //         src={desktopImgCard4}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //     img_mobile: (
  //       <img
  //         src={mobileImgCard4}
  //         alt="Sample pictures of data visualization project."
  //       />
  //     ),
  //   },
];
