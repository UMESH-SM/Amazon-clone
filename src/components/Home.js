import React, { useState, useContext } from "react";
import "./Home.css";
import { ProductContext } from "../contexts/ProductContext";
import { SearchContext } from "../contexts/SearchContext";
import Header from "./Header";
import Carousel from "./Carousel";
import Product from "./Product";
import { db } from "../firebase_config";
import SnackBar from "./SnackBar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

function Home() {
  const [products, setProducts] = useContext(ProductContext);
  const [search, setSearch] = useContext(SearchContext);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  let mobilesList = [];
  products.productsList.forEach((categoryItem) => {
    if (categoryItem.category === "electronics") {
      categoryItem.categoryItems.forEach((subcategoryItem) => {
        if (subcategoryItem.subcategory === "mobiles") {
          mobilesList = subcategoryItem.subcategoryItems;
        }
      });
    }
  });

  let laptopsList = [];
  products.productsList.forEach((categoryItem) => {
    if (categoryItem.category === "electronics") {
      categoryItem.categoryItems.forEach((subcategoryItem) => {
        if (subcategoryItem.subcategory === "laptops") {
          laptopsList = subcategoryItem.subcategoryItems;
        }
      });
    }
  });

  const handleEditProduct = (
    id,
    oldCategory,
    oldSubcategory,
    displayName,
    searchName,
    imageUrl,
    price,
    rating,
    reviews,
    category,
    subcategory,
    brand
  ) => {
    let productsCopy = products;
    productsCopy.productsList.forEach((categoryItem) => {
      if (categoryItem.category === oldCategory) {
        categoryItem.categoryItems.forEach((subcategoryItem) => {
          if (subcategoryItem.subcategory === oldSubcategory) {
            subcategoryItem.subcategoryItems.map((productItem) => {
              if (productItem.id === id) {
                productItem.title = displayName;
                productItem.searchName = searchName;
                productItem.image = imageUrl;
                productItem.price = parseInt(price);
                productItem.rating = parseInt(rating);
                productItem.reviews = parseInt(reviews);
                productItem.category = category;
                productItem.subcategory = subcategory;
                productItem.brand = brand;
              }
            });
          }
        });
      }
    });

    db.collection("products")
      .doc("productsDoc")
      .set(productsCopy)
      .then(() => {
        console.log("Product updated.");
      })
      .catch((error) => {
        console.error("Error editing product: ", error);
      });

    setProducts({
      productsList: productsCopy.productsList,
    });
  };

  const handleSnackbarAlert = (searchName) => {
    setSnackbaralert({
      show: true,
      type: "success",
      msg: searchName + " added to cart.",
    });
  };

  const sideScroll = (element, direction, speed, distance, step) => {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  return search.searchResults.length ? (
    search.searchResults[0].id === "empty" ? (
      <>
        <Header />
        <div className="home__empty">
          <img
            src="https://cdn.dribbble.com/users/1554526/screenshots/3399669/no_results_found.png"
            alt=""
          />
        </div>
      </>
    ) : (
      <>
        <Header />
        <div className="home">
          <div className="home__productsContainer">
            {search.searchResults.map((item) => (
              <Product
                key={item.id}
                item={item}
                handleEditProduct={handleEditProduct}
                handleSnackbarAlert={handleSnackbarAlert}
              />
            ))}
          </div>
        </div>
        {snackbaralert.show ? (
          <SnackBar
            snackbaralert={snackbaralert}
            setSnackbaralert={setSnackbaralert}
          />
        ) : null}
      </>
    )
  ) : (
    <>
      <Header />
      <Carousel />
      <div className="home">
        <div className="home__productsCategory">Electronics</div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Mobiles</div>
          <div
            id="home__productsContainer1"
            className="home__productsContainer"
          >
            {mobilesList.map((item) => (
              <Product
                key={item.id}
                item={item}
                handleEditProduct={handleEditProduct}
                handleSnackbarAlert={handleSnackbarAlert}
              />
            ))}
          </div>
          <span
            className="homeproductsContainer__LeftScroll"
            onClick={() => {
              const container = document.getElementById(
                "home__productsContainer1"
              );
              sideScroll(container, "left", 25, 1500, 60);
            }}
          >
            <ChevronLeftIcon style={{ fontSize: "3em", color: "grey" }} />
          </span>
          <span
            className="homeproductsContainer__RightScroll"
            onClick={() => {
              const container = document.getElementById(
                "home__productsContainer1"
              );
              sideScroll(container, "right", 25, 1500, 60);
            }}
          >
            <ChevronRightIcon style={{ fontSize: "3em", color: "grey" }} />
          </span>
        </div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Laptops</div>
          <div
            id="home__productsContainer2"
            className="home__productsContainer"
          >
            {laptopsList.map((item) => (
              <Product
                key={item.id}
                item={item}
                handleEditProduct={handleEditProduct}
                handleSnackbarAlert={handleSnackbarAlert}
              />
            ))}
          </div>
          <span
            className="homeproductsContainer__LeftScroll"
            onClick={() => {
              const container = document.getElementById(
                "home__productsContainer2"
              );
              sideScroll(container, "left", 25, 1500, 60);
            }}
          >
            <ChevronLeftIcon style={{ fontSize: "3em", color: "grey" }} />
          </span>
          <span
            className="homeproductsContainer__RightScroll"
            onClick={() => {
              const container = document.getElementById(
                "home__productsContainer2"
              );
              sideScroll(container, "right", 25, 1500, 60);
            }}
          >
            <ChevronRightIcon style={{ fontSize: "3em", color: "grey" }} />
          </span>
        </div>
        {/* <div className="home__productsLayer">
          <div className="home__productsSubcategory">Televisions</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Tablets</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>

        <div className="home__productsCategory">Clothing</div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Shirts</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">T-Shirts</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Pants</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>

        <div className="home__productsCategory">Footwear</div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Shoes</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div>
        <div className="home__productsLayer">
          <div className="home__productsSubcategory">Sandals</div>
          <div className="home__productsContainer">
            {products.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                price={item.price}
                inCart={item.inCart}
              />
            ))}
          </div>
        </div> */}
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

export default Home;
