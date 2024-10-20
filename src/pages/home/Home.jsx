import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./home.css";
import "../../components/card/card.css";
import { cards } from "./../../data";
import Card from "../../components/card/Card";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { SlideNextButton } from "../../components/SlideNextButton/SlideNextButton";
import { ScrollTrigger } from "gsap/all";
import { SlidePrevButton } from "../../components/SlidePrevButton/SlidePrevButton";

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
          <SlidePrevButton />
          {topCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} hasHtmlId={false} />
            </SwiperSlide>
          ))}
          <SlideNextButton />
        </Swiper>
      </section>

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
