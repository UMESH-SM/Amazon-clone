import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import { db } from "../firebase_config";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useState({
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
  const didMountRef = useRef(false);

  useEffect(() => {
    if (user.uid) {
      if (didMountRef.current) {
        db.collection(user.uid)
          .doc("cart")
          .set(cart)
          .catch((error) => {
            console.error("Error adding cart details: ", error);
          });
      } else {
        didMountRef.current = true;
      }
    }
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
