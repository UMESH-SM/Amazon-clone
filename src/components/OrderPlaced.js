import React, { useState, useEffect } from "react";
import "./OrderPlaced.css";
import Header from "./Header";
import DoneIcon from "@material-ui/icons/Done";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import SnackBar from "./SnackBar";

function OrderPlaced() {
  const [proceed, setProceed] = useState(false);
  const [proceedOrders, setProceedOrders] = useState(false);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    setSnackbaralert({
      show: true,
      type: "success",
      msg: "Order placed.",
    });
  }, []);

  const handleRouteOrders = () => {
    setProceedOrders(true);
    setProceed(true);
  };

  return proceed ? (
    proceedOrders ? (
      <Redirect to="/orders" />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <div className="orderplaced">
      <Header />
      <div className="orderplaced__container">
        <div className="orderplaced__title">
          <DoneIcon /> Thank you, your order has been placed.
        </div>
        <div className="orderplaced__button">
          <Button variant="contained" size="small" onClick={handleRouteOrders}>
            View orders
          </Button>
        </div>
        <div className="orderplaced__button">
          <Button
            variant="contained"
            size="small"
            onClick={() => setProceed(true)}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </div>
  );
}

export default OrderPlaced;
