import React, { useState } from "react";
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

export default function EditProduct({ item, handleEditProduct }) {
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
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="addproduct__input">
                  <label>Sub-category</label>
                  {category === "electronics" ? (
                    <select
                      defaultValue={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option value="laptops">Laptops</option>
                      <option value="mobiles">Mobiles</option>
                      <option value="tablets">Tablets</option>
                      <option value="televisions">Televisions</option>
                      <option value="smartwatches">Smartwatches</option>
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                  {category === "clothing" ? (
                    <select
                      defaultValue={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option value="jeans">Jeans</option>
                      <option value="t-shirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="trousers">Trousers</option>
                      <option value="pants">Pants</option>
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                  {category === "others" ? (
                    <select
                      defaultValue="others"
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                </div>
                <div className="addproduct__input">
                  <label>Brand</label>
                  {category === "electronics" ? (
                    <select
                      defaultValue={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="acer">Acer</option>
                      <option value="apple">Apple</option>
                      <option value="avita">Avita</option>
                      <option value="asus">Asus</option>
                      <option value="dell">Dell</option>
                      <option value="google">Google</option>
                      <option value="honor">Honor</option>
                      <option value="hp">HP</option>
                      <option value="huawei">Huawei</option>
                      <option value="lenovo">Lenovo</option>
                      <option value="lg">LG</option>
                      <option value="mi">MI</option>
                      <option value="microsoft">Microsoft</option>
                      <option value="oneplus">Oneplus</option>
                      <option value="oppo">Oppo</option>
                      <option value="panasonic">Panasonic</option>
                      <option value="realme">Realme</option>
                      <option value="redmi">Redmi</option>
                      <option value="tcl">TCL</option>
                      <option value="samsung">Samsung</option>
                      <option value="sony">Sony</option>
                      <option value="vivo">Vivo</option>
                      <option value="vu">VU</option>
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                  {category === "clothing" ? (
                    <select
                      defaultValue={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="adidas">Adidas</option>
                      <option value="allen-solly">Allen Solly</option>
                      <option value="deisel">Deisel</option>
                      <option value="flying-machine">Flying Machine</option>
                      <option value="levis">Levi's</option>
                      <option value="lee-cooper">Lee Cooper</option>
                      <option value="mufti">Mufti</option>
                      <option value="nike">Nike</option>
                      <option value="park-avenue">Park Avenue</option>
                      <option value="pepe-jeans">Pepe Jeans</option>
                      <option value="peter-england">Peter England</option>
                      <option value="provogue">Provogue</option>
                      <option value="puma">Puma</option>
                      <option value="raymond">Raymond</option>
                      <option value="tommy-hilfiger">Tommy Hilfiger</option>
                      <option value="us-polo">US Polo</option>
                      <option value="van-heusen">Van-Heusen</option>
                      <option value="wrangler">Wrangler</option>
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                  {category === "others" ? (
                    <select
                      defaultValue="others"
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="others">Others</option>
                    </select>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
