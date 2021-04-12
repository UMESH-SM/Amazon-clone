import React, { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search]);

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
                productItem.image = imageUrl.split(",")[0];
                productItem.images = imageUrl.split(",");
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
        setSnackbaralert({
          show: true,
          type: "success",
          msg: searchName + " updated.",
        });
      })
      .catch((error) => {
        console.error("Error editing product: ", error);
      });

    setProducts({
      productsList: productsCopy.productsList,
    });
  };

  const handleDeleteProduct = (category, subcategory, id, searchName) => {
    let productsCopy = products;
    productsCopy.productsList.forEach((categoryItem) => {
      if (categoryItem.category === category) {
        categoryItem.categoryItems.forEach((subcategoryItem) => {
          if (subcategoryItem.subcategory === subcategory) {
            subcategoryItem.subcategoryItems = subcategoryItem.subcategoryItems.filter(
              (item) => item.id !== id
            );
          }
        });
      }
    });

    db.collection("products")
      .doc("productsDoc")
      .set(productsCopy)
      .then(() => {
        console.log("Product deleted.");
        setSnackbaralert({
          show: true,
          type: "success",
          msg: searchName + " deleted.",
        });
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
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
      if (direction === "left") {
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const categoryDisplay = (categoryItem, i) => {
    let noSubcategories = true;
    const subcategoryDisplay = categoryItem.categoryItems.map(
      (subcategoryItem, j) => {
        return subcategoryItem.subcategoryItems.length ? (
          <div className="home__productsLayer">
            {(noSubcategories = false)}
            <div className="home__productsSubcategory">
              {capitalizeFirstLetter(subcategoryItem.subcategory)}
            </div>
            <div
              id={`home__productsContainer${i}${j}`}
              className="home__productsContainer"
            >
              {subcategoryItem.subcategoryItems.map((item) => (
                <Product
                  key={item.id}
                  item={item}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                  handleSnackbarAlert={handleSnackbarAlert}
                />
              ))}
            </div>
            <span
              className="homeproductsContainer__LeftScroll"
              onClick={() => {
                const container = document.getElementById(
                  `home__productsContainer${i}${j}`
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
                  `home__productsContainer${i}${j}`
                );
                sideScroll(container, "right", 25, 1500, 60);
              }}
            >
              <ChevronRightIcon style={{ fontSize: "3em", color: "grey" }} />
            </span>
          </div>
        ) : null;
      }
    );

    if (noSubcategories) {
      return null;
    }

    return (
      <>
        <div className="home__productsCategory">
          {capitalizeFirstLetter(categoryItem.category)}
        </div>
        {subcategoryDisplay}
      </>
    );
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
          <div className="home__searchProductsContainer">
            {search.searchResults.map((item) => (
              <Product
                key={item.id}
                item={item}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
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
        {products.productsList.map((categoryItem, i) => {
          return categoryDisplay(categoryItem, i);
        })}
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
