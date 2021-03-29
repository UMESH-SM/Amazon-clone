import React from "react";
import "./ReviewProduct.css";

function ReviewProduct({ item }) {
  const { image, title, price, quantity } = item;

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  return (
    <div className="reviewproduct">
      <div className="reviewproduct__image">
        <img src={image} alt="" />
      </div>
      <div className="reviewproduct__details">
        <div className="reviewproductdetails__title">{title}</div>
        <div className="reviewproductdetails__price">
          <span className="rupee__symbol">₹</span> {getIndianRupeeFormat(price)}
        </div>
        <div className="reviewproductdetails__quantity">
          Quantity: {quantity}
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
