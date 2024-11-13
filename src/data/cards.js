import desktopImgCard1 from "../assets/d_card_picture_p1.png";
import mobileImgCard1 from "../assets/m_card_picture_p1.png";
import desktopImgCard2 from "../assets/d_card_picture_p2.png";
import mobileImgCard2 from "../assets/m_card_picture_p2.png";
import desktopImgCard3 from "../assets/d_card_picture_p3.png";
import mobileImgCard3 from "../assets/m_card_picture_p3.png";
import desktopImgCard4 from "../assets/d_card_picture_p4.png";
import mobileImgCard4 from "../assets/m_card_picture_p4.png";
import { TOOLS } from "./tools";
import { EXPERTISE } from "./expertise";
import { LANGUAGES } from "./languages";

export const cards = [
  {
    id: 1,
    htmlId: "one",
    gsap: {
      id: "#one",
      toColor: "#E0D5DC",
    },
    order: 4,
    title:
      "Enhancing Efficiency: Business Application for Supply Chain Optimization",
    description: `I used Figma to design a digital solution that addressed a client’s data experience challenges, focusing on optimizing their supply chain network. Over an eight-week period, I conducted extensive Data Experience (DX) research, which informed the design and prototyping of a business application aimed at streamlining and enhancing the efficiency of their operations.`,
    tools:
      "Figma + DX Research + Data Viz Design + Product Design + UX/UI Design",
    toolsValues: [TOOLS.FIGMA.value],
    toolsLabels: [TOOLS.FIGMA.label],
    languagesValues: [],
    languagesLabels: [],
    expertiseValues: [
      EXPERTISE.DXRESEARCH.value,
      EXPERTISE.DATAVIZDESIGN.value,
      EXPERTISE.PRODUCTDESIGN.value,
      EXPERTISE.UXUIDESIGN.value,
    ],
    expertiseLabels: [
      EXPERTISE.DXRESEARCH.label,
      EXPERTISE.DATAVIZDESIGN.label,
      EXPERTISE.PRODUCTDESIGN.label,
      EXPERTISE.UXUIDESIGN.label,
    ],
    backgroundColor: "var(--bc-project-id1)",
    btn: {
      text: "GO TO PROJECT",
      color: "var(--btn-project-id1)",
      aLink: "/project-network-edge",
    },
    images: {
      desktop: {
        src: desktopImgCard1,
      },
      mobile: {
        src: mobileImgCard1,
        positionBottom: "-1.5rem",
        positionRight: "-1.5rem",
      },
    },
  },
  {
    id: 2,
    htmlId: "two",
    gsap: {
      id: "#two",
      toColor: "#D8D6E8",
    },
    order: 1,
    title:
      "Sustainable Business Travel: A Data-Driven Carbon Emission Analysis",
    description: `I developed a database and data model to monitor and analyze carbon emissions from corporate air travel. Using SQL, I prepared, cleaned, and organized the data for analysis. I then designed and developed an interactive Tableau dashboard, empowering companies to visualize emissions data, pinpoint major contributors, and uncover actionable insights.`,
    tools:
      "SQL + Tableau + Data Modelling + Data Processing + Data Analysis + Data Viz Design + Dashboard Design",
    toolsValues: [TOOLS.TABLEAU.value],
    toolsLabels: [TOOLS.TABLEAU.label],
    languagesValues: [LANGUAGES.SQL.value],
    languagesLabels: [LANGUAGES.SQL.label],
    expertiseValues: [
      EXPERTISE.DASHBOARDDESIGN.value,
      EXPERTISE.DATAVIZDESIGN.value,
      EXPERTISE.DATAANALYSIS.value,
      EXPERTISE.DATAMODELLING.value,
      EXPERTISE.DATAPROCESSING.value,
    ],
    expertiseLabels: [
      EXPERTISE.DASHBOARDDESIGN.label,
      EXPERTISE.DATAVIZDESIGN.label,
      EXPERTISE.DATAANALYSIS.label,
      EXPERTISE.DATAMODELLING.label,
      EXPERTISE.DATAPROCESSING.label,
    ],
    backgroundColor: "var(--bc-project-id2)",
    btn: {
      text: "GO TO PROJECT",
      color: "var(--btn-project-id2)",
      aLink: "../project_sustainable_travel/ProjectSustainableTravel.jsx",
    },
    images: {
      desktop: {
        src: desktopImgCard2,
        positionBottom: "-2rem",
      },
      mobile: {
        src: mobileImgCard2,
        positionBottom: "-2.5rem",
        positionRight: "-1.2rem",
      },
    },
  },
  {
    id: 3,
    htmlId: "three",
    gsap: {
      id: "#three",
      toColor: "#EFEEF8",
    },
    order: 3,
    title:
      "Visualizing Iris Species: A Comparative Analysis of Multiple Measures",
    description: `In this private project, I focused on visualizing the Iris Species dataset by utilizing scatterplot matrix and parallel coordinates charts to analyze key metrics. Although these visualizations are not typically used in business reporting, they are widely applied in statistical analysis for their ability to reveal complex patterns and relationships within the data.`,
    tools: "HTML/CSS + JavaScript + d3.js + Data Viz Design + Data Analysis",
    toolsValues: [],
    toolsLabels: [],
    languagesValues: [
      LANGUAGES.D3.value,
      LANGUAGES.HTML.value,
      LANGUAGES.CSS.value,
      LANGUAGES.JAVASCRIPT.value,
    ],
    languagesLabels: [
      LANGUAGES.D3.label,
      LANGUAGES.HTML.label,
      LANGUAGES.CSS.label,
      LANGUAGES.JAVASCRIPT.label,
    ],
    expertiseValues: [
      EXPERTISE.DATAVIZDESIGN.value,
      EXPERTISE.DATAANALYSIS.value,
    ],
    expertiseLabels: [
      EXPERTISE.DATAVIZDESIGN.label,
      EXPERTISE.DATAANALYSIS.label,
    ],
    backgroundColor: "var(--bc-project-id3)",
    btn: {
      text: "GO TO OBSERVABLE NOTEBOOK",
      color: "var(--btn-project-id3)",
      refLink: "https://observablehq.com/d/40e11c389ce691ef",
    },
    images: {
      desktop: {
        src: desktopImgCard3,
        positionBottom: "-1.4rem",
      },
      mobile: {
        src: mobileImgCard3,
        positionBottom: "-3.5rem",
        positionRight: "-1rem",
      },
    },
  },
  {
    id: 4,
    htmlId: "four",
    gsap: {
      id: "#four",
      toColor: "#E9EEF0",
    },
    order: 2,
    title: `Cyclistic Case Study: A Capstone Project for Google BI Certification`,
    description: `
    The capstone project, focused on preparing Cyclistic’s customer analysis, serves as the final assignment for the Google Business Intelligence Professional Certification, demonstrating the application of advanced BI skills in a real-world business context. This project not only reinforces technical expertise but also highlights the ability to derive actionable insights from data to support business decisions.`,
    tools:
      "Tableau + Mapbox + SQL + Data Viz Design + Data Analysis + Data Modelling + Data Processing",
    toolsValues: [TOOLS.TABLEAU.value, TOOLS.MAPBOX.value],
    toolsLabels: [TOOLS.TABLEAU.label, TOOLS.MAPBOX.label],
    languagesValues: [LANGUAGES.SQL.value],
    languagesLabels: [LANGUAGES.SQL.label],
    expertiseValues: [
      EXPERTISE.DATAVIZDESIGN.value,
      EXPERTISE.DATAANALYSIS.value,
      EXPERTISE.DATAMODELLING.value,
      EXPERTISE.DATAPROCESSING.value,
    ],
    expertiseLabels: [
      EXPERTISE.DATAVIZDESIGN.label,
      EXPERTISE.DATAANALYSIS.label,
      EXPERTISE.DATAMODELLING.label,
      EXPERTISE.DATAPROCESSING.label,
    ],
    backgroundColor: "var(--bc-project-id4)",
    btn: {
      text: "GO TO PROJECT",
      color: "var(--btn-project-id4)",
      aLink: "/capstone-project-google-bi-certification",
    },
    images: {
      desktop: {
        src: desktopImgCard4,
        positionBottom: "-2.4rem",
      },
      mobile: {
        src: mobileImgCard4,
        positionBottom: "-2.2rem",
        positionRight: "-1rem",
      },
    },
  },
];
