import React, { useContext } from "react";
import "./CartProduct.css";
import { CartContext } from "../contexts/CartContext";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Button, ButtonGroup } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function CartProduct({ item }) {
  const { id, image, title, rating, reviews, price, quantity } = item;
  const [cart, setCart] = useContext(CartContext);

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const handleRemoveFromCart = () => {
    setCart({
      ...cart,
      items: cart.items.filter((item) => item.id !== id),
      size: cart.size - quantity,
      total: cart.total - price * quantity,
    });
  };

  const handleQuantityPlus = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      }),
      size: cart.size + 1,
      total: cart.total + price,
    });
  };

  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setCart({
        ...cart,
        items: cart.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        }),
        size: cart.size - 1,
        total: cart.total - price,
      });
    } else {
      handleRemoveFromCart();
    }
  };

  return (
    <div className="cartproduct">
      <div className="cartproduct__image">
        <img src={image} alt="" />
      </div>
      <div className="cartproduct__info">
        <div className="cartproduct__title">{title}</div>
        <div className="cartproduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} />
            ))}
          {Array(5 - rating)
            .fill()
            .map((_, i) => (
              <StarBorderIcon key={i} />
            ))}
          &nbsp;<span className="reviews__arrow">▾ </span>
          <span className="cartproduct__reviewscount">
            {getIndianRupeeFormat(reviews)}
          </span>
        </div>
        <div className="quantity">
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            disableElevation
          >
            <Button variant="contained" onClick={handleQuantityMinus}>
              <span className="plus__minus">
                {quantity < 2 ? (
                  <DeleteOutlineIcon
                    fontSize="small"
                    onClick={handleRemoveFromCart}
                  />
                ) : (
                  <RemoveIcon fontSize="small" />
                )}
              </span>
            </Button>
            <div className="quantity__value">{quantity}</div>
            <Button variant="contained" onClick={handleQuantityPlus}>
              <span className="plus__minus">
                <AddIcon fontSize="small" />
              </span>
            </Button>
          </ButtonGroup>
        </div>
        <div className="cartproduct__price">
          <span className="rupee__symbol">₹</span> {getIndianRupeeFormat(price)}
        </div>
        <div className="cartproduct__removefromCart">
          <Button
            variant="contained"
            size="small"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
