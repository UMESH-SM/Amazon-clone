import React, { useState, useContext } from "react";
import "./Subtotal.css";
import { CartContext } from "../contexts/CartContext";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Redirect } from "react-router-dom";

function Subtotal({ handleSnackbarAlert }) {
  const [cart, setCart] = useContext(CartContext);
  const [proceed, setProceed] = useState(false);

  const handleProceedToBuy = () => {
    if (cart.size) {
      setProceed(true);
    } else {
      handleSnackbarAlert();
    }
  };

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  return proceed ? (
    <Redirect to="/delivery" />
  ) : (
    <div className="subtotal">
      {cart.total < 500 ? (
        <div className="note">
          <ErrorOutlinedIcon style={{ color: "#29a3a3" }} /> Add{" "}
          <span className="rupee__symbol">₹</span> {500 - cart.total}
          <span className="small__decimal">.00</span> of eligible items to your
          order to qualify for FREE Delivery. Details
        </div>
      ) : (
        <div className="note">
          <CheckCircleIcon style={{ color: "green" }} /> Your order is eligible
          for FREE Delivery. Select this option at checkout. Details
        </div>
      )}

      <div className="subtotal__price">
        Subtotal ({cart.size} item{cart.size > 1 ? "s" : null}):
        <span className="rupee__symbol"> {"  ₹"}</span>
        <span className="price">
          {getIndianRupeeFormat(cart.total)}
          <span className="small__decimal">.00</span>
        </span>
      </div>
      <div className="gift__box">
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="This order contains a gift"
        />
      </div>
      <div className="subtotal__proceedButton">
        <Button variant="contained" size="small" onClick={handleProceedToBuy}>
          Proceed to Buy
        </Button>
      </div>
    </div>
  );
}

export default Subtotal;
