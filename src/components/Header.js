import React, { useContext, useState } from "react";
import "./Header.css";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { AddressContext } from "../contexts/AddressContext";
import { SearchContext } from "../contexts/SearchContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { fire } from "../firebase_config";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import SearchBox from "./SearchBox";

require("dotenv").config();

function Header() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const [address, setAddress] = useContext(AddressContext);
  const [proceed, setProceed] = useState(false);
  const [value, setValue] = useState("");
  const [searchProductId, setSearchProductId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [search, setSearch] = useContext(SearchContext);

  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "signin-popover" : undefined;

  const [anchorE2, setAnchorE2] = useState(null);
  const open2 = Boolean(anchorE2);
  const id2 = open2 ? "address-popover" : undefined;

  const [anchorE3, setAnchorE3] = useState(null);
  const open3 = Boolean(anchorE3);
  const id3 = open3 ? "category-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };

  const handleClick3 = (event) => {
    setAnchorE3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorE3(null);
  };

  const handleSignout = () => {
    setAnchorEl(null);
    fire.auth().signOut();
    setUser({
      name: "",
      email: "",
      uid: "",
    });
    setCart({
      items: [],
      address: {
        id: "",
        name: "",
        mobile: "",
        houseNo: "",
        street: "",
        city: "",
        landmark: "",
        pincode: "",
        state: "",
        country: "",
      },
      payment: {
        type: "",
        title: "",
        value: "",
      },
      size: 0,
      total: 0,
    });
  };

  const handleSignin = () => {
    setAnchorEl(null);
    setProceed(true);
  };

  const handleSignin2 = () => {
    setAnchorE2(null);
    setProceed(true);
  };

  const handleSearch = () => {
    if (value === "") {
      if (search.searchResults.length) {
        setSearch({
          ...search,
          searchResults: [],
        });
      }
    } else if (selectedValue === value) {
      if (searchProductId !== "") {
        let filterSearch = [];
        search.searchProducts.forEach((section) => {
          section.subcategoryItems.forEach((item) => {
            if (item.id === searchProductId) {
              filterSearch.push(item);
            }
          });
        });
        setSearch({
          ...search,
          searchResults: filterSearch,
        });
      }
    } else {
      setSearchProductId("");
      if (value !== "") {
        let regex = null;
        if (value.length < 2) {
          regex = new RegExp("^" + value, "i");
        } else {
          regex = new RegExp(value, "i");
        }
        let filterSearch = [];
        search.searchProducts.forEach((section) => {
          section.subcategoryItems.forEach((item) => {
            if (
              regex.test(item.brand) ||
              regex.test(item.category) ||
              regex.test(item.subcategory) ||
              regex.test(item.title)
            ) {
              filterSearch.push(item);
            }
          });
        });
        if (filterSearch.length) {
          setSearch({
            ...search,
            searchResults: filterSearch,
          });
        } else {
          setSearch({
            ...search,
            searchResults: [{ id: "empty" }],
          });
        }
      }
    }

    if (window.location.pathname !== "/") {
      history.push("/");
    }
  };
  const history = useHistory();
  const handleRouteHome = () => {
    if (value !== "") {
      setValue("");
    }
    if (search.searchResults.length) {
      setSearch({
        ...search,
        searchResults: [],
      });
    }
    history.push("/");
  };

  const handleCategory = (category) => {
    setAnchorE3(null);
    if (category === "all") {
      handleRouteHome();
    } else {
      let filterSearch = [];
      search.searchProducts.forEach((section) => {
        section.subcategoryItems.forEach((item) => {
          if (item.category === category) {
            filterSearch.push(item);
          }
        });
      });
      setSearch({
        ...search,
        searchResults: filterSearch,
      });
    }
  };

  return proceed ? (
    <Redirect to="/signin" />
  ) : (
    <div className="header">
      <Button
        onClick={handleRouteHome}
        disableElevation="true"
        disableFocusRipple="true"
        disableRipple="true"
      >
        <div className="header__logo">
          <img src="./amazon-logo.jpg" alt="" />
        </div>
      </Button>
      <div className="select__locationBtn">
        <Button aria-describedby={id2} onClick={handleClick2}>
          <div className="select__location">
            <div className="first__line">
              {user.uid && address.defaultAddress.id ? "Deliver to" : "Hello"}
            </div>
            <div className="second__line">
              <LocationOnOutlinedIcon fontSize="small" />
              <div className="bottom__line2">
                {user.uid && address.defaultAddress.id
                  ? address.defaultAddress.name
                  : "Select your address"}
              </div>
            </div>
          </div>
        </Button>
        <Popover
          id={id2}
          open={open2}
          anchorEl={anchorE2}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            {user.uid ? (
              address.defaultAddress.id ? (
                <>
                  <div>{address.defaultAddress.name}</div>
                  <div>{address.defaultAddress.houseNo}</div>
                  <div>{address.defaultAddress.street}</div>
                  <div>{address.defaultAddress.landmark}</div>
                  <div>{address.defaultAddress.city}</div>
                  <div>
                    {address.defaultAddress.state} -{" "}
                    {address.defaultAddress.pincode}
                  </div>
                  <div>{address.defaultAddress.country}</div>
                  <div>Phone : {address.defaultAddress.mobile}</div>
                  <div>
                    <Link
                      to="/manage-addresses"
                      className="header__changeDefaultAddressButton"
                    >
                      <Button variant="contained" size="small">
                        Change default address
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <Link to="/manage-addresses" className="header__signinButton">
                    <Button variant="contained" size="small">
                      Set default address
                    </Button>
                  </Link>
                </div>
              )
            ) : (
              <div className="header__signinButton">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSignin2}
                >
                  Sign in
                </Button>
              </div>
            )}
          </Typography>
        </Popover>
      </div>
      <div className="header__search">
        <button
          className="category__button"
          aria-describedby={id3}
          onClick={handleClick3}
        >
          All<span className="down__arrow">▼</span>
        </button>
        <Popover
          id={id3}
          open={open3}
          anchorEl={anchorE3}
          onClose={handleClose3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            <div className="header__categoryButtons">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleCategory("all")}
              >
                All
              </Button>
            </div>
            <div className="header__categoryButtons">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleCategory("electronics")}
              >
                Electronics
              </Button>
            </div>
            <div className="header__categoryLastButton">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleCategory("clothing")}
              >
                Clothing
              </Button>
            </div>
          </Typography>
        </Popover>
        <SearchBox
          value={value}
          setValue={setValue}
          searchProducts={search.searchProducts}
          setSearchProductId={setSearchProductId}
          setSelectedValue={setSelectedValue}
          handleSearch={handleSearch}
        />
        <button className="search__button" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
      <div className="header__nav">
        <div className="country__option">
          <img className="india__flag" src="india-flag.png" alt="" />
          <span className="down__arrow small__arrow">▼</span>
        </div>

        <Button aria-describedby={id} onClick={handleClick}>
          <div className="nav__option">
            <div className="top__line">
              Hello, {user.name ? user.name : "Sign in"}
            </div>
            <div className="bottom__line">
              Accounts & Lists
              <span className="small__arrow align__arrow">▼</span>
            </div>
          </div>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            {user.uid ? (
              <>
                <div>
                  <Link
                    to="/manage-account"
                    className="header__manageAccountButton"
                  >
                    <Button variant="contained" size="small">
                      Manage account
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/manage-addresses"
                    className="header__manageAddressButton"
                  >
                    <Button variant="contained" size="small">
                      Manage addresses
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/manage-cards"
                    className="header__manageCardsButton"
                  >
                    <Button variant="contained" size="small">
                      Manage cards
                    </Button>
                  </Link>
                </div>
                {user.uid === process.env.REACT_APP_ADMIN_ID ? (
                  <div>
                    <Link
                      to="/add-product"
                      className="header__manageCardsButton"
                    >
                      <Button variant="contained" size="small">
                        Add Product
                      </Button>
                    </Link>
                  </div>
                ) : null}
                <div className="header__signoutButton">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSignout}
                  >
                    Sign out
                  </Button>
                </div>
              </>
            ) : (
              <div className="header__signinButton">
                <Button variant="contained" size="small" onClick={handleSignin}>
                  Sign in
                </Button>
              </div>
            )}
          </Typography>
        </Popover>

        <div className="nav__option">
          <Link to={user.uid ? "/orders" : "/signin"}>
            <div className="top__line">Returns</div>
            <div className="bottom__line">& Orders</div>
          </Link>
        </div>
        <div className="cart__option">
          <Link to={user.uid ? "/cart" : "/signin"}>
            <div className="cart__count">{cart.size}</div>
            <ShoppingCartOutlinedIcon
              style={{ fontSize: 35, color: "white" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
