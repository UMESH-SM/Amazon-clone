import React from "react";
import "./OrderDetails.css";
import SimplePopover from "./SimplePopover";
import SimplePopover2 from "./SimplePopover2";

function OrderDetails({ order }) {
  const item = order.item;
  const address = order.address;
  const orderid = order.id;
  const payment = order.payment;
  const delivery = order.delivery;
  const orderedon = order.orderedon;

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const todayDate = new Date();
  const deliveryDate = new Date(
    delivery.month + 1 + "/" + delivery.date + "/" + delivery.year
  );
  const delivered = deliveryDate > todayDate;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="orderdetails">
      <div className="orderdetails__toprow">
        <div className="orderdetails__orderplaceddate">
          <div className="toprow__title">ORDER PLACED</div>
          <div className="bottomrow__title">
            {orderedon.date +
              " " +
              monthNames[orderedon.month] +
              " " +
              orderedon.year}
          </div>
        </div>
        <div className="orderdetails__total">
          <div className="toprow__title">TOTAL</div>
          <div className="bottomrow__title">
            <span className="rupee__symbol">₹ </span>{" "}
            {getIndianRupeeFormat(item.price * item.quantity)}
            <span className="small__decimal">.00</span>
          </div>
        </div>
        <div className="orderdetails__shipto">
          <div className="toprow__title">SHIP TO</div>
          <div className="bottomrow__title">
            <SimplePopover address={address} />
          </div>
        </div>
        <div className="orderdetails__payment">
          <div className="toprow__title">PAYMENT</div>
          <div className="bottomrow__title">
            <SimplePopover2 payment={payment} />
          </div>
        </div>
        <div className="orderdetails__orderid">
          <div className="toprow__title">ORDER ID</div>
          <div className="bottomrow__title">{orderid}</div>
        </div>
      </div>
      <div className="orderdetails__bottomrow">
        <div className="orderdetails__image">
          <img src={item.image} alt="" />
        </div>
        <div className="orderdetails__desciption">
          <div
            className={
              delivered
                ? "orderdetails__deliveryBy"
                : "orderdetails__deliveredOn"
            }
          >
            {delivered ? "Delivery by : " : "Delivered on : "}
            {delivery.date +
              " " +
              monthNames[delivery.month] +
              " " +
              delivery.year}
          </div>
          <div className="orderdetails__title">{item.title}</div>
          <div className="orderdetails__quantity">
            Quantity : {item.quantity}
          </div>
          <div className="orderdetails__price">
            Price : <span className="rupee__symbol">₹ </span>{" "}
            {getIndianRupeeFormat(item.price)}
            <span className="small__decimal">.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
