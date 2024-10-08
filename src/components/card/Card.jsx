import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div className="card-container">
      <div>
        <p>{card.title}</p>
        <p>{card.description}</p>
        <p>{card.tools}</p>
      </div>
      <div>
        <div className="img-desktop">{card.img_desktop}</div>
        <div className="img-mobile">{card.img_mobile}</div>
      </div>
    </div>
  );
}

export default Card;
