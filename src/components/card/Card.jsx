import React from "react";
import { Link } from "react-router-dom";
import { HiExternalLink } from "react-icons/hi";

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
            {card.btn.aLink ? (
              <a href={card.btn.a}>
                <button
                  className="btn-project"
                  style={{ backgroundColor: card.btn.color }}
                >
                  {card.btn.text}
                </button>
              </a>
            ) : (
              <Link to={card.btn.refLink}>
                <button
                  className="btn-project"
                  style={{ backgroundColor: card.btn.color }}
                >
                  {card.btn.text}
                  <div className="btn-icon">
                    <HiExternalLink />
                  </div>
                </button>
              </Link>
            )}
          </div>
          <div
            className="card-container-img-desktop"
            style={{
              backgroundImage: `url(${card.images.desktop.src})`,
              backgroundPosition: `bottom ${card.images.desktop.position_bottom} center`,
            }}
          />
          <div
            className="card-container-img-tablet"
            style={{
              backgroundImage: `url(${card.images.desktop.src})`,
              backgroundPosition: `bottom ${card.images.tablet.position_bottom} center`,
            }}
          />
          <div
            className="card-container-img-mobile"
            style={{
              backgroundColor: card.btn.color,
              backgroundImage: `url(${card.images.mobile.src})`,
              backgroundPosition: `bottom ${card.images.mobile.position_bottom} right ${card.images.mobile.position_right}`,
            }}
          />
        </div>
      </article>
    </div>
  );
}

export default Card;
