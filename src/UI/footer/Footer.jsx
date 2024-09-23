import React from "react";
import "./footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { SiObservable } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { SiTableau } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-name">
        <LiaCopyrightSolid />{" "}
        <strong className="footer-name-text">2024 Liwia Wagner</strong>
      </div>
      <div className="footer-icons">
        <a href="https://github.com/LiwiaWagner">
          <BsGithub />
        </a>
        <a href="https://public.tableau.com/app/profile/liwia2886">
          <SiTableau />
        </a>
        <a href="https://observablehq.com/@liwiawagner?tab=profile">
          <SiObservable />
        </a>
        <a href="https://www.linkedin.com/in/liwia-wagner-01615020/">
          {" "}
          <FaLinkedinIn />
        </a>
        <a href="https://x.com/liwia_wagner">
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
};

export default Footer;
