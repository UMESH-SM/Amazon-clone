import React, { useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { CartContext } from "./contexts/CartContext";
import { AddressContext } from "./contexts/AddressContext";
import { CardsContext } from "./contexts/CardsContext";
import { OrdersContext } from "./contexts/OrdersContext";
import { ProductContext } from "./contexts/ProductContext";
import { SearchContext } from "./contexts/SearchContext";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Delivery from "./components/Delivery";
import Payment from "./components/Payment";
import PlaceOrder from "./components/PlaceOrder";
import OrderPlaced from "./components/OrderPlaced";
import Orders from "./components/Orders";
import ManageAccount from "./components/ManageAccount";
import ManageAddressPage from "./components/ManageAddressPage";
import ManageCardsPage from "./components/ManageCardsPage";
import AddProduct from "./components/AddProduct";
import ManageCategory from "./components/ManageCategory";
import ForgotPassword from "./components/ForgotPassword";
import { fire, db } from "./firebase_config";

require("dotenv").config();

function App() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const [address, setAddress] = useContext(AddressContext);
  const [cards, setCards] = useContext(CardsContext);
  const [orders, setOrders] = useContext(OrdersContext);
  const [products, setProducts] = useContext(ProductContext);
  const [search, setSearch] = useContext(SearchContext);

  useEffect(() => {
    db.collection("products")
      .doc("productsDoc")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const products_info = doc.data();
          setProducts(products_info);
          let products_searchList = [];
          products_info.productsList.forEach((categoryItem) => {
            categoryItem.categoryItems.forEach((subcategoryItem) => {
              products_searchList.push(subcategoryItem);
            });
          });
          setSearch({
            ...search,
            searchProducts: products_searchList,
          });
        }
      })
      .catch((error) => {
        console.log("Products info fetch error in App: ", error);
      });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.uid)
          .doc("user-info")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const user_info = doc.data();
              setUser({
                name: user_info.name,
                email: user_info.email,
                uid: user.uid,
              });
            }
          })
          .catch((error) => {
            console.log("User info fetch error in App: ", error);
          });

        db.collection(user.uid)
          .doc("cart")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const cart_info = doc.data();
              setCart(cart_info);
            }
          })
          .catch((error) => {
            console.log("Cart info fetch error in App: ", error);
          });

        db.collection(user.uid)
          .doc("address")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const address_info = doc.data();
              setAddress(address_info);
            }
          })
          .catch((error) => {
            console.log("Address info fetch error in App: ", error);
          });

        db.collection(user.uid)
          .doc("cards")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const cards_info = doc.data();
              setCards(cards_info);
            }
          })
          .catch((error) => {
            console.log("Cards info fetch error in App: ", error);
          });

        db.collection(user.uid)
          .doc("orders")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const orders_info = doc.data();
              setOrders(orders_info);
            }
          })
          .catch((error) => {
            console.log("Orders info fetch error in App: ", error);
          });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/cart">
            {user.uid ? <Cart /> : <Redirect to="/" />}
          </Route>
          <Route path="/delivery">
            {user.uid ? <Delivery /> : <Redirect to="/" />}
          </Route>
          <Route path="/payment">
            {user.uid ? <Payment /> : <Redirect to="/" />}
          </Route>
          <Route path="/place-order">
            {user.uid ? <PlaceOrder /> : <Redirect to="/" />}
          </Route>
          <Route path="/order-placed">
            {user.uid ? <OrderPlaced /> : <Redirect to="/" />}
          </Route>
          <Route path="/orders">
            {user.uid ? <Orders /> : <Redirect to="/" />}
          </Route>
          <Route path="/manage-account">
            {user.uid ? <ManageAccount /> : <Redirect to="/" />}
          </Route>
          <Route path="/manage-addresses">
            {user.uid ? <ManageAddressPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/manage-cards">
            {user.uid ? <ManageCardsPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/add-product">
            {user.uid === process.env.REACT_APP_ADMIN_ID ? (
              <AddProduct />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/manage-categories">
            {user.uid === process.env.REACT_APP_ADMIN_ID ? (
              <ManageCategory />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
