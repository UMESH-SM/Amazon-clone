import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import { db } from "../firebase_config";

export const OrdersContext = createContext();

export const OrdersProvider = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [orders, setOrders] = useState({
    ordersList: [],
  });
  const didMountRef = useRef(false);

  useEffect(() => {
    if (user.uid) {
      if (didMountRef.current) {
        db.collection(user.uid)
          .doc("orders")
          .set(orders)
          .catch((error) => {
            console.error("Error adding order details: ", error);
          });
      } else {
        didMountRef.current = true;
      }
    }
  }, [orders]);

  return (
    <OrdersContext.Provider value={[orders, setOrders]}>
      {props.children}
    </OrdersContext.Provider>
  );
};
