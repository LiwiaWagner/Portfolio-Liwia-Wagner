import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div className="card-container">
      <div className="card-container-left">
        <p className="card-title">{card.title}</p>
        <p className="card-description">{card.description}</p>
        <p className="card-tools">{card.tools}</p>
        <button className="btn-project">{card.btn_text}</button>
      </div>
      <div className="card-container-right">
        <div className="img-desktop">{card.img_desktop}</div>
        <div className="img-mobile">{card.img_mobile}</div>
      </div>
    </div>
  );
}

export default Card;
