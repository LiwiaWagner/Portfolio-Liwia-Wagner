import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div className="card-container">
      <div className="card-container-left">
        <p>{card.title}</p>
        <p>{card.description}</p>
        <p>{card.tools}</p>
        <button className="btn-project btn-project-1">GO TO PROJECT</button>
      </div>
      <div className="card-container-right">
        <div className="img-desktop">{card.img_desktop}</div>
        <div className="img-mobile">{card.img_mobile}</div>
      </div>
    </div>
  );
}

export default Card;
