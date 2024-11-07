import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LiaCopyrightSolid } from "react-icons/lia";
import { SiObservable, SiTableau } from "react-icons/si";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-name">
        <LiaCopyrightSolid />{" "}
        <strong className="footer-name-text">2024 Liwia Wagner</strong>
      </div>
      <div className="footer-icons">
        <a
          href="https://github.com/LiwiaWagner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub />
        </a>
        <a
          href="https://public.tableau.com/app/profile/liwia2886"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiTableau />
        </a>
        <a
          href="https://observablehq.com/@liwiawagner?tab=profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiObservable />
        </a>
        <a
          href="https://www.linkedin.com/in/liwia-wagner-01615020/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://x.com/liwia_wagner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
};

export default Footer;
