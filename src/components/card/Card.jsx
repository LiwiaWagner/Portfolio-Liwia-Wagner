import React from "react";

function Card(props) {
  const card = props.card;
  return (
    <div>
      <p>{card.title}</p>
      <p>{card.description}</p>
      <p>{card.tools}</p>
      <div>{card.img_desktop}</div>
      <div>{card.img_mobile}</div>
    </div>
  );
}

export default Card;
