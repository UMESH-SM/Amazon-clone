import React, { useContext, useState, useEffect } from "react";
import "./AddProduct.css";
import Header from "./Header";
import { Button } from "@material-ui/core";
import { ProductContext } from "../contexts/ProductContext";
import { db } from "../firebase_config";
import SnackBar from "./SnackBar";

function AddProduct() {
  const [products, setProducts] = useContext(ProductContext);
  const [displayName, setDisplayName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("none");
  const [reviews, setReviews] = useState("");
  const [category, setCategory] = useState("none");
  const [subcategory, setSubcategory] = useState("none");
  const [brand, setBrand] = useState("none");
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [categories, setCategories] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    db.collection("products")
      .doc("info")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const productsInfo = doc.data();
          setCategories(productsInfo);
          setCategoriesList(productsInfo.categoriesList);
        }
      })
      .catch((error) => {
        console.log("Products info fetch error while adding products: ", error);
      });
  }, []);

  useEffect(() => {
    if (category === "none") {
      setSubcategoriesList([]);
      setBrandsList([]);
    } else {
      categories &&
        categories.categories.forEach((item) => {
          if (item.category === category) {
            setSubcategoriesList(item.subcategoriesList);
            setBrandsList(item.brandsList);
          }
        });
    }
  }, [category]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (rating === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a rating.",
      });
    } else if (category === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a category.",
      });
    } else if (subcategory === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a subcategory.",
      });
    } else if (brand === "none") {
      setSnackbaralert({
        show: true,
        type: "error",
        msg: "Please select a brand.",
      });
    } else {
      let productsCopy = products;
      let newCategory = true;
      let newSubcategory = true;
      productsCopy.productsList.forEach((categoryItem) => {
        if (categoryItem.category === category) {
          newCategory = false;
          categoryItem.categoryItems.forEach((subcategoryItem) => {
            if (subcategoryItem.subcategory === subcategory) {
              newSubcategory = false;
              subcategoryItem.subcategoryItems.push({
                id: category + "_" + subcategory + "_" + new Date().getTime(),
                title: displayName,
                searchName,
                image: imageUrl.split(",")[0],
                images: imageUrl.split(","),
                price: parseInt(price),
                rating: parseInt(rating),
                reviews: parseInt(reviews),
                category,
                subcategory,
                brand,
              });
            }
          });
          if (newSubcategory) {
            categoryItem.categoryItems.push({
              subcategory: subcategory,
              subcategoryItems: [
                {
                  id: category + "_" + subcategory + "_" + new Date().getTime(),
                  title: displayName,
                  searchName,
                  image: imageUrl.split(",")[0],
                  images: imageUrl.split(","),
                  price: parseInt(price),
                  rating: parseInt(rating),
                  reviews: parseInt(reviews),
                  category,
                  subcategory,
                  brand,
                },
              ],
            });
          }
        }
      });

      if (newCategory) {
        productsCopy.productsList.push({
          category: category,
          categoryItems: [
            {
              subcategory: subcategory,
              subcategoryItems: [
                {
                  id: category + "_" + subcategory + "_" + new Date().getTime(),
                  title: displayName,
                  searchName,
                  image: imageUrl.split(",")[0],
                  images: imageUrl.split(","),
                  price: parseInt(price),
                  rating: parseInt(rating),
                  reviews: parseInt(reviews),
                  category,
                  subcategory,
                  brand,
                },
              ],
            },
          ],
        });
      }

      setProducts(productsCopy);

      db.collection("products")
        .doc("productsDoc")
        .set(productsCopy)
        .then(() => {
          console.log("Product added.");
          setSnackbaralert({
            show: true,
            type: "success",
            msg: searchName + " added.",
          });
        })
        .catch((error) => {
          console.error("Error adding/editing products: ", error);
        });

      clearInputs();
    }
  };

  const clearInputs = () => {
    setDisplayName("");
    setSearchName("");
    setImageUrl("");
    setPrice("");
    setReviews("");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
              <label>
                Images URLs (Enter all Images URLs seperated with commas)
              </label>
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
                  defaultValue="none"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="none">--- select ---</option>
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
                  defaultValue="none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="none">--- select ---</option>
                  {categoriesList &&
                    categoriesList.map((item, i) => (
                      <option key={i} value={item}>
                        {capitalizeFirstLetter(item)}
                      </option>
                    ))}
                </select>
              </div>
              <div className="addproduct__input">
                <label>Sub-category</label>
                <select
                  defaultValue="none"
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="none">--- select ---</option>
                  {subcategoriesList &&
                    subcategoriesList.map((item, i) => (
                      <option key={i} value={item}>
                        {capitalizeFirstLetter(item)}
                      </option>
                    ))}
                </select>
              </div>
              <div className="addproduct__input">
                <label>Brand</label>
                <select
                  defaultValue="none"
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="none">--- select ---</option>
                  {brandsList &&
                    brandsList.map((item, i) => (
                      <option key={i} value={item}>
                        {capitalizeFirstLetter(item)}
                      </option>
                    ))}
                  <option value="others">Others</option>
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
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </>
  );
}

export default AddProduct;
