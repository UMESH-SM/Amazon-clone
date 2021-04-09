import React, { useState, useContext, useEffect } from "react";
import "./Orders.css";
import { OrdersContext } from "../contexts/OrdersContext";
import Header from "./Header";
import OrderDetails from "./OrderDetails";
import SnackBar from "./SnackBar";

function Orders() {
  const [orders, setOrders] = useContext(OrdersContext);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="orders">
      <Header />
      {orders.ordersList && orders.ordersList.length ? (
        <div className="orders__container">
          {orders.ordersList.map((order) => (
            <OrderDetails
              key={order.id}
              order={order}
              setSnackbaralert={setSnackbaralert}
            />
          ))}
        </div>
      ) : (
        <div className="orders__empty">
          <img src="ordersempty.png" alt="" />
          <span>No Orders found.</span>
        </div>
      )}
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </div>
  );
}

export default Orders;
