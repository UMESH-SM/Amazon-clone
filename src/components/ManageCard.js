import React from "react";
import "./Card.css";
import DeleteIcon from "@material-ui/icons/Delete";

function ManageCard({ item, handleCardDeleteConfirm }) {
  return (
    <div className="card">
      <div className="name__ending">
        <div className="card__name">{item.cardName}</div>
        <div className="ending__with">
          {" ending with " + item.number.substring(12)}
        </div>
        <img src={item.type + ".png"} alt="" />
        <div
          className="deleteCard__button"
          onClick={() => handleCardDeleteConfirm(item.id, item.cardName)}
          style={{
            height: "3.5vh",
            display: "flex",
            alignItems: "center",
            color: "red",
            cursor: "pointer",
          }}
        >
          <DeleteIcon style={{ fontSize: "1em" }} />{" "}
          <span style={{ fontSize: "0.8em" }}> Delete</span>
        </div>
      </div>
      <div className="name__onCard">{item.nameOnCard}</div>
      <div className="expires__on">
        {item.expiryMonth}/{item.expiryYear}
      </div>
    </div>
  );
}

export default ManageCard;
