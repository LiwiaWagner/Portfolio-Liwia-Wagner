import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideNextButton } from "../../components/SlideNextButton/SlideNextButton";
import "../../components/SlideNextButton/slideNextButton.css";
import { SlidePrevButton } from "../../components/SlidePrevButton/SlidePrevButton";
import "../../components/SlidePrevButton/slidePrevButton.css";
import Card from "../../components/card/Card";
import "../../components/card/card.css";
import { cards } from "../../data/data";
import "./home.css";
import { TOOLS } from "../../data/tools";
import { EXPERTISE } from "../../data/expertise";
import { LANGUAGES } from "../../data/languages";

const options = [
  EXPERTISE.DATAVIZDESIGN,
  EXPERTISE.DASHBOARDDESIGN,
  EXPERTISE.PRODUCTDESIGN,
  EXPERTISE.UXUIDESIGN,
  EXPERTISE.DXRESEARCH,
  EXPERTISE.DATAANALYSIS,
  EXPERTISE.DATAMODELLING,
  EXPERTISE.DATAPROCESSING,
  LANGUAGES.JAVASCRIPT,
  LANGUAGES.HTML,
  LANGUAGES.CSS,
  LANGUAGES.SQL,
  LANGUAGES.D3,
  LANGUAGES.REACT,
  TOOLS.FIGMA,
  TOOLS.TABLEAU,
  TOOLS.MAPBOX,
];

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

const tl = gsap.timeline();
let prevColor = null;
let activeIndex = 0;

const Home = () => {
  const [startColor, setStartColor] = useState("#E0D5DC");
  const [tools, setTools] = useState([]);
  const location = useLocation();

  const topCards = cards.filter((card) => [1, 2, 3].includes(card.id));
  const orderedCards = [...cards].sort((a, b) => a.order - b.order);

  const onNavigationPrev = () => {
    activeIndex -= 1;

    if (activeIndex < 0) {
      activeIndex = topCards.length - 1;
    }

    const card = topCards[activeIndex];
    setStartColor(card.gsap.toColor);
  };

  const onNavigationNext = () => {
    activeIndex += 1;

    if (activeIndex >= topCards.length) {
      activeIndex = 0;
    }

    const card = topCards[activeIndex];
    setStartColor(card.gsap.toColor);
  };

  const handleSelectChange = (data, m) => {
    setTools(data.map((x) => x.value));
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
          onNavigationPrev={onNavigationPrev}
          onNavigationNext={onNavigationNext}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
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
                options={options}
                isMulti={true}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <div className="filter-section">
            <h5 className="filter-label">Tool</h5>
            <div className="filters">
              <Select
                options={options}
                isMulti={true}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <div className="filter-section">
            <h5 className="filter-label">Programming Language</h5>
            <div className="filters">
              <Select
                options={options}
                isMulti={true}
                onChange={handleSelectChange}
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
