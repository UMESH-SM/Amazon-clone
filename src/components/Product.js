import React, { useState, useContext } from "react";
import "./Product.css";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import EditProduct from "./EditProduct";
import ProductDescription from "./ProductDescription";

function Product({ item, handleEditProduct, handleSnackbarAlert }) {
  const {
    id,
    title,
    searchName,
    image,
    rating,
    reviews,
    price,
    category,
    subcategory,
    brand,
  } = item;
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const [proceed, setProceed] = useState(false);
  const [productDescription, setProductDescription] = useState({
    show: false,
    item: item,
  });
  let popup = true;

  const getIndianRupeeFormat = (temp) => {
    var x = temp;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const handleAddToCart = () => {
    if (user.uid) {
      handleSnackbarAlert(searchName);
      if (cart.size === 0) {
        setCart({
          ...cart,
          items: [
            {
              id,
              image,
              title,
              rating,
              reviews,
              price,
              category,
              subcategory,
              brand,
              quantity: 1,
            },
          ],
          size: cart.size + 1,
          total: cart.total + price,
        });
      } else {
        let addedToCart = false;
        cart.items.map((item) => {
          if (item.id === id) {
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

            addedToCart = true;
          }
        });
        if (!addedToCart) {
          setCart({
            ...cart,
            items: [
              {
                id,
                image,
                title,
                rating,
                reviews,
                price,
                category,
                subcategory,
                brand,
                quantity: 1,
              },
              ...cart.items,
            ],
            size: cart.size + 1,
            total: cart.total + price,
          });
        }
      }
      popup = false;
    } else {
      setProceed(true);
    }
  };

  const handleProductDescription = () => {
    if (popup) {
      setProductDescription({
        ...productDescription,
        show: true,
      });
    }
    popup = true;
  };

  return proceed ? (
    <Redirect to="/signin" />
  ) : (
    <div className="product" onClick={handleProductDescription}>
      <div className="product__info">
        <div className="productinfo__title">{title}</div>
        <div className="productinfo__rating">
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
          <span className="productinfo__reviewscount">
            {getIndianRupeeFormat(reviews)}
          </span>
        </div>
        <div className="productinfo__price">
          <span className="rupee__symbol">₹</span> {getIndianRupeeFormat(price)}
        </div>
      </div>
      <div className="product__image">
        <img src={image} alt="" />
      </div>
      <div className="productinfo__addtoCart">
        <Button variant="contained" size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
      {user.uid === process.env.REACT_APP_ADMIN_ID ? (
        <EditProduct item={item} handleEditProduct={handleEditProduct} />
      ) : null}
      {productDescription.show ? (
        <ProductDescription
          item={item}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
        />
      ) : null}
    </div>
  );
}

export default Product;
