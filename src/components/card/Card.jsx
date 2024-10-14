import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button.jsx";

function Card(props) {
  const card = props.card;
  const hasHtmlId = props.hasHtmlId;
  return (
    <div
      id={hasHtmlId ? card.htmlId : ""}
      className="project-container"
      style={{ backgroundColor: card.backgroundColor }}
    >
      <article>
        <div className="card-container">
          <div className="card-container-text">
            <p className="card-title">{card.title}</p>
            <p className="card-description">{card.description}</p>
            <p className="card-tools">{card.tools}</p>
            <button
              className="btn-project"
              style={{ backgroundColor: card.btn.color }}
            >
              {/* <Link>{card.btn.refLink}</Link> */}
              {card.btn.text}
            </button>
          </div>
          <div
            className="card-container-img-desktop"
            style={{
              backgroundImage: `url(${card.images.desktop.src})`,
              backgroundPosition: `bottom ${card.images.desktop.position} center`,
            }}
          />
          <div
            className="card-container-img-tablet"
            style={{
              backgroundImage: `url(${card.images.desktop.src})`,
              backgroundPosition: `bottom ${card.images.desktop.position} center`,
            }}
          />
          <div
            className="card-container-img-mobile"
            style={{
              backgroundColor: card.btn.color,
              backgroundImage: `url(${card.images.mobile.src})`,
              backgroundPosition: `bottom ${card.images.mobile.position} right`,
            }}
          />
        </div>
      </article>
    </div>
  );
}

export default Card;
