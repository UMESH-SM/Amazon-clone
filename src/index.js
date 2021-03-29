import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import { CardsProvider } from "./contexts/CardsContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { SearchProvider } from "./contexts/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <AddressProvider>
            <CardsProvider>
              <OrdersProvider>
                <SearchProvider>
                  <App />
                </SearchProvider>
              </OrdersProvider>
            </CardsProvider>
          </AddressProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
