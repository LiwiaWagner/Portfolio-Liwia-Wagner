import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, EffectCoverflow, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/card/Card";
import "../../components/card/card.css";
import { cards } from "../../data/data";
import { EXPERTISE } from "../../data/expertise";
import { LANGUAGES } from "../../data/languages";
import { TOOLS } from "../../data/tools";
import "./home.css";

const optionsExpertise = [
  EXPERTISE.DATAVIZDESIGN,
  EXPERTISE.DASHBOARDDESIGN,
  EXPERTISE.PRODUCTDESIGN,
  EXPERTISE.UXUIDESIGN,
  EXPERTISE.DXRESEARCH,
  EXPERTISE.DATAANALYSIS,
  EXPERTISE.DATAMODELLING,
  EXPERTISE.DATAPROCESSING,
];

const optionsLanguages = [
  LANGUAGES.JAVASCRIPT,
  LANGUAGES.HTML,
  LANGUAGES.CSS,
  LANGUAGES.SQL,
  LANGUAGES.D3,
  LANGUAGES.REACT,
];

const optionsTools = [TOOLS.FIGMA, TOOLS.TABLEAU, TOOLS.MAPBOX];

const getConfig = (trigger, startColor, endColor) => {
  return {
    scrollTrigger: {
      trigger: trigger,
      scrub: true,
      markers: false,
      start: "top 40%",
      end: "top 20%",
    },
    startAt: { backgroundColor: startColor, "--background-color": startColor },
    backgroundColor: endColor,
    "--background-color": endColor,
  };
};

const getCardById = (id) => {
  return cards.find((card) => card.id === id);
};

const tl = gsap.timeline();
let prevColor = null;

const Home = () => {
  const [startColor, setStartColor] = useState("#E0D5DC");
  const [expertise, setExpertise] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tools, setTools] = useState([]);
  const location = useLocation();

  const topCards = [getCardById(2), getCardById(1), getCardById(3)];
  const orderedCards = [...cards]
    .sort((a, b) => a.order - b.order)
    .filter((card) =>
      expertise.length > 0
        ? card.expertiseValues.some((value) => expertise.includes(value))
        : true
    )
    .filter((card) =>
      languages.length > 0
        ? card.languagesValues.some((value) => languages.includes(value))
        : true
    )
    .filter((card) =>
      tools.length > 0
        ? card.toolsValues.some((value) => tools.includes(value))
        : true
    );

  const handleSelectChangeExpertise = (data) => {
    setExpertise(data.map((d) => d.value));
  };

  const handleSelectChangeLanguages = (data) => {
    setLanguages(data.map((d) => d.value));
  };

  const handleSelectChangeTool = (data) => {
    setTools(data.map((d) => d.value));
  };

  useGSAP(() => {
    ScrollTrigger.getAll().forEach((e) => e.kill(true));
    prevColor = startColor;

    tl.set("body", {
      backgroundColor: startColor,
      "--background-color": startColor,
    });

    orderedCards.forEach((card) => {
      tl.to("body", getConfig(card.gsap.id, prevColor, card.gsap.toColor));
      prevColor = card.gsap.toColor;
    });

    tl.set("body", {
      backgroundColor: startColor,
      "--background-color": startColor,
    });
  }, [startColor]);

  useEffect(() => {
    if (location.hash) {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

      <section className="top-projects-container">
        <Swiper
          modules={[Pagination, Scrollbar, A11y, EffectCoverflow]}
          slidesPerView={"auto"}
          pagination={{ clickable: true }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          initialSlide={1}
          speed={600}
          preventClicks={true}
          coverflowEffect={{
            stretch: 80,
            slideShadows: false,
          }}
          onSlideChange={(e) => {
            const card = topCards[e.activeIndex];
            setStartColor(card.gsap.toColor);
          }}
        >
          {topCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} hasHtmlId={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div id="view">
        <div>
          <h2 className="projects-title">ALL PROJECTS</h2>
        </div>

        <h2 className="filter-section-title">Filter by</h2>

        <div className="filter-section-container">
          <div className="filter-section">
            <h5 className="filter-label">Expertise</h5>
            <div className="filters">
              <Select
                options={optionsExpertise}
                isMulti={true}
                onChange={handleSelectChangeExpertise}
              />
            </div>
          </div>

          <div className="filter-section">
            <h5 className="filter-label">Programming Language</h5>
            <div className="filters">
              <Select
                options={optionsLanguages}
                isMulti={true}
                onChange={handleSelectChangeLanguages}
              />
            </div>
          </div>

          <div className="filter-section">
            <h5 className="filter-label">Tool</h5>
            <div className="filters">
              <Select
                options={optionsTools}
                isMulti={true}
                onChange={handleSelectChangeTool}
              />
            </div>
          </div>
        </div>

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
