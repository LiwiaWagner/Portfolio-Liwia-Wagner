import React from "react";
import { Link } from "react-router-dom";
import { HiExternalLink } from "react-icons/hi";

function Card(props) {
  const card = props.card;
  const hasHtmlId = props.hasHtmlId;
  const hasALink = Boolean(card.btn.aLink);
  const imgPosition = props.imgPosition || "right";
  const cardLink = hasALink ? card.btn.aLink : card.btn.refLink;
  const linkTarget = hasALink ? "_self" : "_blank";

  return (
    <div
      id={hasHtmlId ? card.htmlId : ""}
      className="project-container"
      style={{ backgroundColor: card.backgroundColor }}
    >
      <article>
        <Link
          to={cardLink}
          target={linkTarget}
          className="card-link"
          style={{ textDecoration: "none" }}
        >
          <div
            className={`card-container ${
              imgPosition === "right" ? "" : "card-container-img-left"
            }`}
          >
            <div className="card-container-text">
              <p className="card-title">{card.title}</p>
              <p className="card-description">{card.description}</p>
              <p className="card-tools">{card.tools}</p>

              <div className="btn-container">
                <button
                  className="btn-project"
                  style={{ backgroundColor: card.btn.color }}
                >
                  {card.btn.text}
                  {!hasALink && (
                    <div className="btn-icon">
                      <HiExternalLink />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div
              className="card-container-img-desktop card-container-img-tablet"
              style={{
                backgroundImage: `url(${card.images.desktop.src})`,
                backgroundPosition: `center center`,
              }}
            />

            <div
              className="card-container-img-mobile"
              style={{
                backgroundColor: card.btn.color,
                backgroundImage: `url(${card.images.mobile.src})`,
                backgroundPosition: `bottom ${card.images.mobile.positionBottom} right ${card.images.mobile.positionRight}`,
              }}
            />
          </div>
        </Link>
      </article>
    </div>
  );
}

export default Card;
