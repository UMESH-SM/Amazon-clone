import React, { useState, useContext } from "react";
import "./OrderSummary.css";
import { CartContext } from "../contexts/CartContext";
import { OrdersContext } from "../contexts/OrdersContext";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

function OrderSummary({
  deliveryDate,
  deliveryMonth,
  deliveryYear,
  todayDate,
  todayMonth,
  todayYear,
}) {
  const [cart, setCart] = useContext(CartContext);
  const [orders, setOrders] = useContext(OrdersContext);
  const [proceed, setProceed] = useState(false);

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const handlePlaceOrder = () => {
    let orderedItems = [];
    cart.items.forEach((item, i) => {
      orderedItems[i] = {
        id:
          Math.floor(Math.random() * (999 - 100 + 1) + 100) +
          "-" +
          Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000) +
          "-" +
          Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000),
        item: {
          image: item.image,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        },
        address: cart.address,
        payment: cart.payment,
        delivery: {
          date: deliveryDate,
          month: deliveryMonth,
          year: deliveryYear,
        },
        orderedon: {
          date: todayDate,
          month: todayMonth,
          year: todayYear,
        },
      };
    });

    setOrders({
      ordersList: [...orderedItems, ...orders.ordersList],
    });

    setCart({
      items: [],
      address: {
        id: "",
        name: "",
        mobile: "",
        houseNo: "",
        street: "",
        city: "",
        landmark: "",
        pincode: "",
        state: "",
        country: "",
      },
      payment: {
        type: "",
        title: "",
        value: "",
      },
      size: 0,
      total: 0,
    });
    setProceed(true);
  };

  return proceed ? (
    <Redirect to="/order-placed" />
  ) : (
    <div className="ordersummary">
      <div className="ordersummary__placeyourorder">
        <Button variant="contained" size="small" onClick={handlePlaceOrder}>
          Place your order
        </Button>
      </div>
      <div className="ordersummary__details">
        <div className="ordersummary__line">Order Summary</div>
        <div className="ordersummary__items">
          <span>Items:</span>
          <span>
            <span className="rupee__symbol">₹ </span>
            {getIndianRupeeFormat(cart.total)}
            <span className="small__decimal">.00</span>
          </span>
        </div>
        <div className="ordersummary__delivery">
          <span>Delivery:</span>
          <span>
            {cart.total < 500 ? (
              <>
                <span className="rupee__symbol">₹ </span> 40
                <span className="small__decimal">.00</span>
              </>
            ) : (
              "–"
            )}
          </span>
        </div>
      </div>
      <div className="ordersummary__total">
        <span>Order Total:</span>
        <span>
          <span className="rupee__symbol">₹ </span>
          {cart.total < 500 ? (
            <>
              {getIndianRupeeFormat(cart.total + 40)}{" "}
              <span className="small__decimal">.00</span>
            </>
          ) : (
            <>
              {getIndianRupeeFormat(cart.total)}{" "}
              <span className="small__decimal">.00</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
