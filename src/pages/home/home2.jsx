import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// gsap.set(document.body, {
//   backgroundColor: 'white',
// });

// gsap.to(document.body, {
//   scrollTrigger: {
//     trigger: '#root',
//     scrub: true,
//   },
//   backgroundColor: 'orange',
// });

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

export const Home2 = () => {
  useGSAP(() => {
    gsap
      .timeline()
      .to("body", getConfig("#one", "white", "orange"))
      .to("body", getConfig("#three", "orange", "#cd5c5c"));

    // const tl = gsap.timeline();
    //
    // tl.to('body', {
    //   scrollTrigger: {
    //     trigger: '#one',
    //     scrub: true,
    //     markers: true,
    //   },
    //   startAt: { backgroundColor: 'white' },
    //   backgroundColor: 'orange',
    // }).to('body', {
    //   scrollTrigger: {
    //     trigger: '#three',
    //     scrub: true,
    //     markers: true,
    //   },
    //   startAt: { backgroundColor: 'orange' },
    //   backgroundColor: '#cd5c5c',
    // });
  });

  return (
    <section id="test" style={{ margin: "800px 0" }}>
      <div id="one" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
      <div id="two" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
      <div id="three" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
      <div id="four" style={{ height: 1000, borderBottom: "solid 1px" }}></div>
    </section>
  );
};
