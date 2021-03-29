import React, { useContext } from "react";
import "./Orders.css";
import { OrdersContext } from "../contexts/OrdersContext";
import Header from "./Header";
import OrderDetails from "./OrderDetails";

function Orders() {
  const [orders, setOrders] = useContext(OrdersContext);

  return (
    <div className="orders">
      <Header />
      {orders.ordersList && orders.ordersList.length ? (
        <div className="orders__container">
          {orders.ordersList.map((order) => (
            <OrderDetails key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="orders__empty">
          <img src="ordersempty.png" alt="" />
          <span>No Orders found.</span>
        </div>
      )}
    </div>
  );
}

export default Orders;
