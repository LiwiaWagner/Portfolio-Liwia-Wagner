import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div>
      <p>{card.title}</p>
      <p>{card.description}</p>
      <p>{card.tools}</p>
      <div>{card.img_large}</div>
      <div>{card.img_small}</div>
    </div>
  );
}

export default Card;
