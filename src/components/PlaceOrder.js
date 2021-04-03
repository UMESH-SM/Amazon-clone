import React, { useContext } from "react";
import "./PlaceOrder.css";
import DeliveryStepper from "./DeliveryStepper";
import OrderSummary from "./OrderSummary";
import { CartContext } from "../contexts/CartContext";
import ReviewProduct from "./ReviewProduct";

function PlaceOrder() {
  const [cart, setCart] = useContext(CartContext);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dateToday = today.getDate();
  const monthToday = today.getMonth();
  const yearToday = today.getFullYear();
  const dayToday = today.getDay();
  const hoursToday = today.getHours();
  const minutesToday = today.getMinutes();

  let deliveryDate = dateToday + 4;
  let deliveryMonth = monthToday;
  let deliveryYear = yearToday;
  let deliveryDay = dayToday + 4;

  if (monthToday === 11) {
    if (deliveryDate > 31) {
      deliveryDate %= 31;
      deliveryMonth = 0;
      deliveryYear += 1;
    }
  } else if (monthToday === 1) {
    if (deliveryDate > 28) {
      deliveryDate %= 28;
      deliveryMonth = 2;
    }
  } else if (
    monthToday === 0 ||
    monthToday === 2 ||
    monthToday === 4 ||
    monthToday === 6 ||
    monthToday === 7 ||
    monthToday === 9
  ) {
    if (deliveryDate > 31) {
      deliveryDate %= 31;
      deliveryMonth = monthToday + 1;
    }
  } else {
    if (deliveryDate > 30) {
      deliveryDate %= 30;
      deliveryMonth = monthToday + 1;
    }
  }

  if (deliveryDay > 6) {
    deliveryDay %= 7;
  }

  return (
    <div className="placeorder">
      <DeliveryStepper step={2} />
      <div className="placeorder__body">
        <div className="placeorder__title">Review your order</div>
        <div className="placeorder__note">
          By placing your order, you agree to Amazon's privacy notice and
          conditions of use.
        </div>
        <div className="placeorder__container">
          <div className="placeorder__leftContainer">
            <div className="placeorder__addressDetails">
              <div className="placeorder__shippingDetails">
                <div className="placeordershippingDetails__title">
                  Shipping address
                </div>
                <div>
                  <div>{cart.address.name}</div>
                  <div>{cart.address.houseNo}</div>
                  <div>{cart.address.street}</div>
                  <div>{cart.address.city}</div>
                  <div>{cart.address.landmark}</div>
                  <div>
                    {cart.address.state} - {cart.address.pincode}
                  </div>
                  <div>{cart.address.country}</div>
                  <div>Mobile: {cart.address.mobile}</div>
                </div>
              </div>
              <div className="placeorder__paymentDetails">
                <div className="placeorderpaymentDetails__title">
                  Payment method
                </div>
                <div>
                  <div>{cart.payment.title}</div>
                  <div>
                    {cart.payment.type.toLowerCase() === "card"
                      ? "xxxx xxxx xxxx "
                      : null}
                    {cart.payment.value}
                  </div>
                </div>
              </div>
            </div>
            <div className="placeorder__orderDetails">
              <div className="placeorder__deliveryDate">
                Delivery date:{" "}
                {deliveryDate +
                  " " +
                  monthNames[deliveryMonth] +
                  " " +
                  deliveryYear}
              </div>
              <div className="placeorder__deliveryNote">
                If you order in the next {24 - hoursToday - 1} hrs and{" "}
                {60 - minutesToday - 1} mins.
              </div>
              <div className="placeorder__itemDetailsContainer">
                <div className="placeorder__itemDetails">
                  {cart.items.map((item) => (
                    <ReviewProduct key={item.id} item={item} />
                  ))}
                </div>
                <div className="placeorder__deliveryDay">
                  <div className="deliveryday__title">Delivery Details</div>
                  <div>
                    <span className="fontgreencolor">
                      {weekDays[deliveryDay]}
                    </span>{" "}
                    — ₹ 40<span className="small__decimal">.00</span> FREE
                    Delivery on eligible orders
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="placeorder__rightContainer">
            <OrderSummary
              deliveryDate={deliveryDate}
              deliveryMonth={deliveryMonth}
              deliveryYear={deliveryYear}
              todayDate={dateToday}
              todayMonth={monthToday}
              todayYear={yearToday}
            />
          </div>
        </div>
        <div className="placeorder__footer">
          <div>
            Need help? Check our{" "}
            <span className="fontcolorblue">help pages</span> or{" "}
            <span className="fontcolorblue">contact us 24x7</span>
          </div>
          <div>
            When your order is placed, we'll send you an e-mail message
            acknowledging receipt of your order. If you choose to pay using an
            electronic payment method (credit card, debit card or net banking),
            you will be directed to your bank's website to complete your
            payment. Your contract to purchase an item will not be complete
            until we receive your electronic payment and dispatch your item. If
            you choose to pay using Pay on Delivery (POD), you can pay using
            cash/card/net banking when you receive your item.
          </div>
          <div>
            See Amazon.in's <span className="fontcolorblue">Return Policy</span>
            .
          </div>
          <div>
            Go to the <span className="fontcolorblue">Amazon.in homepage</span>{" "}
            without completing your order.
          </div>
        </div>
        <div className="placeorder__hr">
          <hr />
        </div>
        <div className="placeorder__copyright">
          <span className="fontcolorblue">Conditions of Use</span> |{"  "}
          <span className="fontcolorblue">Privacy Notice</span> © 2012-2020,
          Amazon.com, Inc. and its affiliates
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
