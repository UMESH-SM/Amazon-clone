import React, { useContext, useState } from "react";
import "./AddProduct.css";
import Header from "./Header";
import { Button } from "@material-ui/core";
import { ProductContext } from "../contexts/ProductContext";
import { db } from "../firebase_config";

function AddProduct() {
  const [products, setProducts] = useContext(ProductContext);
  const [displayName, setDisplayName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("5");
  const [reviews, setReviews] = useState("");
  const [category, setCategory] = useState("electronics");
  const [subcategory, setSubcategory] = useState("laptops");
  const [brand, setBrand] = useState("apple");

  const handleAddProduct = (e) => {
    e.preventDefault();
    let productsCopy = products;
    productsCopy.productsList.forEach((categoryItem) => {
      if (categoryItem.category === category) {
        categoryItem.categoryItems.forEach((subcategoryItem) => {
          if (subcategoryItem.subcategory === subcategory) {
            subcategoryItem.subcategoryItems.push({
              id: category + subcategory + new Date().getTime(),
              title: displayName,
              searchName,
              image: imageUrl,
              price: parseInt(price),
              rating: parseInt(rating),
              reviews: parseInt(reviews),
              category,
              subcategory,
              brand,
            });
          }
        });
      }
    });
    setProducts(productsCopy);

    db.collection("products")
      .doc("productsDoc")
      .set(productsCopy)
      .then(() => {
        console.log("Product added.");
      })
      .catch((error) => {
        console.error("Error adding/editing products: ", error);
      });

    clearInputs();
  };

  const clearInputs = () => {
    setDisplayName("");
    setSearchName("");
    setImageUrl("");
    setPrice("");
    setReviews("");
  };

  window.scrollTo(0, 0);

  return (
    <>
      <Header />
      <div className="addproduct">
        <div className="addproduct__title">Add product</div>
        <form onSubmit={handleAddProduct}>
          <div className="addproduct__container1">
            <div className="addproduct__input">
              <label>Display name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                minLength="10"
                required
              />
            </div>
            <div className="addproduct__input">
              <label>Search name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                required
              />
            </div>
            <div className="addproduct__input">
              <label>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="addproduct__container2">
            <div className="addproduct__container3">
              <div className="addproduct__input">
                <label>
                  Price <span className="rupee__symbol__large">(₹)</span>
                </label>
                <input
                  type="text"
                  value={price}
                  pattern="[0-9]{1,7}"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="addproduct__input">
                <label>Rating</label>
                <select
                  defaultValue="5"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </select>
              </div>
              <div className="addproduct__input">
                <label>Reviews count</label>
                <input
                  type="text"
                  value={reviews}
                  pattern="[0-9]+"
                  onChange={(e) => setReviews(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="addproduct__container4">
              <div className="addproduct__input">
                <label>Category</label>
                <select
                  defaultValue="electronics"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
              <div className="addproduct__input">
                <label>Sub-category</label>
                {category === "electronics" ? (
                  <select
                    defaultValue="laptops"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option value="laptops">Laptops</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="tablets">Tablets</option>
                    <option value="televisions">Televisions</option>
                    <option value="smartwatches">Smartwatches</option>
                  </select>
                ) : null}
                {category === "clothing" ? (
                  <select
                    defaultValue="shirts"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                  </select>
                ) : null}
              </div>
              <div className="addproduct__input">
                <label>Brand</label>
                <select
                  defaultValue="apple"
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="apple">Apple</option>
                  <option value="asus">Asus</option>
                  <option value="mi">Mi</option>
                  <option value="oneplus">Oneplus</option>
                  <option value="oppo">Oppo</option>
                  <option value="redmi">Redmi</option>
                  <option value="samsung">Samsung</option>
                  <option value="vivo">Vivo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="addproduct__addButton">
            <Button type="submit" variant="contained" size="small">
              Add product
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
