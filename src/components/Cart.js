import React, { useState, useContext, useEffect } from "react";
import "./Cart.css";
import { CartContext } from "../contexts/CartContext";
import Header from "./Header";
import CartProduct from "./CartProduct";
import Subtotal from "./Subtotal";
import SnackBar from "./SnackBar";

function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSnackbarAlert = () => {
    setSnackbaralert({
      show: true,
      type: "error",
      msg: "Cart is empty.",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cart__products">
          <div className="cart__title">Shopping Cart</div>
          {cart.size ? (
            cart.items.map((item) => <CartProduct key={item.id} item={item} />)
          ) : (
            <div className="empty__note">
              <img src="empty-cart.png" alt="" />
              <span>Your Amazon Basket is empty</span>
            </div>
          )}
        </div>
        <div className="subtotal__section">
          <Subtotal handleSnackbarAlert={handleSnackbarAlert} />
        </div>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </>
  );
}

export default Cart;
