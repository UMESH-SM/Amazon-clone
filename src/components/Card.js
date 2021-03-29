import React from "react";
import "./Card.css";

function Card({ item }) {
  return (
    <div className="card">
      <div className="name__ending">
        <div className="card__name">{item.cardName}</div>
        <div className="ending__with">
          {" ending with " + item.number.substring(12)}
        </div>
        <img src={item.type + ".png"} alt="" />
      </div>
      <div className="name__onCard">{item.nameOnCard}</div>
      <div className="expires__on">
        {item.expiryMonth}/{item.expiryYear}
      </div>
    </div>
  );
}

export default Card;
