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
  const topCards = cards.filter((card) => [1, 2, 3].includes(card.id));
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
        {topCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </section>

      <div className="carousel"></div>

      <div>
        <h2 className="projects-title">ALL PROJECTS</h2>
      </div>

      <div className="filters"></div>

      <section className="projects-container all-projects-container">
        {orderedCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </section>

      <div id="view" style={{ marginTop: 1000 }}>
        <div className="color-container-test">
          <div className="text-container-test">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus
            eros nisi, quis ullamcorper sapien auctor quis. Sed pharetra
            consequat rutrum. Integer et velit elit. Pellentesque vel libero
            sagittis, sodales tellus id, dictum tortor. Vestibulum tempus magna
            quis imperdiet facilisis. Cras placerat sapien odio, eget molestie
            augue varius at. Donec euismod elementum dictum. Fusce nec iaculis
            eros, eu fringilla metus. Integer imperdiet blandit augue. Sed sit
            amet ornare tellus. Fusce nec maximus quam, in finibus turpis. Proin
            arcu odio, scelerisque eget sodales id, vestibulum eget justo.
            Mauris ullamcorper rutrum augue, sit amet lobortis nunc gravida
            quis. Donec varius odio mi, vitae consectetur enim volutpat in.
            Integer lacinia odio odio, quis suscipit sapien pulvinar vel.
            Curabitur eleifend elementum ipsum vel hendrerit. Donec vitae tortor
            ultrices, lobortis enim pellentesque, accumsan ante. Praesent
            ullamcorper neque justo, sit amet tempor nisl placerat eget. Donec
            feugiat dui sit amet nisl auctor hendrerit. Integer vitae ultricies
            orci, at rutrum erat. Vestibulum nec elit velit. Suspendisse rutrum
            ac metus quis sollicitudin. Suspendisse tristique sodales efficitur.
            Proin malesuada id erat ac porttitor. Praesent ac lacus nisi. Duis
            eget felis diam. Sed volutpat sapien sodales auctor rutrum. Etiam
            scelerisque ac urna sit amet sagittis. Sed non lacinia risus. Proin
            vitae neque ante. In quis mauris vitae nibh tincidunt auctor. In eu
            rhoncus dolor, nec gravida turpis. Aliquam vulputate auctor augue at
            pulvinar. Praesent malesuada, odio vel laoreet tempor, lectus augue
            fermentum ante, id pulvinar dolor neque et lorem. Donec feugiat
            sapien eu sodales egestas. Quisque convallis consequat posuere.
            Phasellus lacinia nisi eget lacus lobortis mollis. Suspendisse sit
            amet auctor risus. Ut in laoreet leo. Morbi quis mollis sapien.
            Donec massa massa, posuere a ullamcorper at, sollicitudin sed urna.
            Donec imperdiet dui nisi, elementum convallis massa tincidunt eu.
            Maecenas diam erat, egestas a augue ac, elementum viverra purus. In
            non elit suscipit, sagittis ipsum a, faucibus mi. Nunc ullamcorper
            cursus enim, id luctus nibh fermentum quis.
          </div>
          <div className="img-container-test"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
