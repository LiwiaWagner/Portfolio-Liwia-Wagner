import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div id="four" className="project-container top-project-container-3">
      <article>
        <div className="card-container">
          <div className="card-container-left">
            <p className="card-title">{card.title}</p>
            <p className="card-description">{card.description}</p>
            <p className="card-tools">{card.tools}</p>
            <button
              className="btn-project"
              style={{ backgroudColor: card.btn.color }}
            >
              {card.btn.text}
            </button>
          </div>
          <div className="card-container-right">
            <img
              className="img-desktop"
              src={card.images.desktop.src}
              alt={card.images.desktop.alt}
            />
            <img
              className="img-mobile"
              src={card.images.mobile.src}
              alt={card.images.mobile.alt}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
