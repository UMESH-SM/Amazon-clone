import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmBox from "./ConfirmBox";
import { db } from "../firebase_config";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProduct({
  item,
  handleEditProduct,
  handleDeleteProduct,
}) {
  let imagesUrls = "";
  item.images.forEach((image, i) => {
    if (i === 0) {
      imagesUrls = imagesUrls + image;
    } else {
      imagesUrls = imagesUrls + "," + image;
    }
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(item.title);
  const [searchName, setSearchName] = useState(item.searchName);
  const [imageUrl, setImageUrl] = useState(imagesUrls);
  const [price, setPrice] = useState(String(item.price));
  const [rating, setRating] = useState(String(item.rating));
  const [reviews, setReviews] = useState(String(item.reviews));
  const [category, setCategory] = useState(item.category);
  const [subcategory, setSubcategory] = useState(item.subcategory);
  const [brand, setBrand] = useState(item.brand);
  const [confirmbox, setConfirmbox] = useState({
    show: false,
    title: "",
    text: "",
    ok: "",
    no: "",
  });
  const [categories, setCategories] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
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
        console.log(
          "Products info fetch error while editing products: ",
          error
        );
      });

    categories &&
      categories.categories.forEach((item) => {
        if (item.category === category) {
          setSubcategoriesList(item.subcategoriesList);
          setBrandsList(item.brandsList);
        }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setDisplayName(item.title);
    setSearchName(item.searchName);
    setImageUrl(imagesUrls);
    setPrice(String(item.price));
    setRating(String(item.rating));
    setReviews(String(item.reviews));
    setCategory(item.category);
    setSubcategory(item.subcategory);
    setBrand(item.brand);

    handleClose();
  };

  const handleEditProductLocal = (e) => {
    e.preventDefault();
    handleClose();
    const id = item.id;
    const oldCategory = item.category;
    const oldSubcategory = item.subcategory;
    handleEditProduct(
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
    );
  };

  const handleDeleteProductConfirm = () => {
    setConfirmbox({
      show: true,
      title: "Delete Product",
      text: "Are you sure?",
      ok: "Yes",
      no: "No",
    });
  };

  const handleConfirmBoxConfirm = () => {
    setConfirmbox({
      ...confirmbox,
      show: false,
    });
    handleClose();
    handleDeleteProduct(
      item.category,
      item.subcategory,
      item.id,
      item.searchName
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="productEdit__container">
      <div className="product__editButton" onClick={handleClickOpen}>
        <EditIcon />
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleEditProductLocal}>
          <AppBar
            className={classes.appBar}
            style={{ backgroundColor: "#232f3e" }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCancelEdit}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit Product
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div
            className="addproduct"
            style={{ minHeight: "60%", marginTop: "5%" }}
          >
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
                    defaultValue={rating}
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
                    defaultValue={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
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
                    defaultValue={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
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
                    defaultValue={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
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
            <div className="editproduct__deleteproductButton">
              <Button
                variant="contained"
                size="small"
                onClick={handleDeleteProductConfirm}
              >
                Delete Product
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
      {confirmbox.show ? (
        <ConfirmBox
          confirmbox={confirmbox}
          setConfirmbox={setConfirmbox}
          handleConfirmBoxConfirm={handleConfirmBoxConfirm}
        />
      ) : null}
    </div>
  );
}
