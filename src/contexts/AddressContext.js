import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import { db } from "../firebase_config";

export const AddressContext = createContext();

export const AddressProvider = (props) => {
  const [address, setAddress] = useState({
    addressList: [],
    defaultAddress: {
      id: "",
      name: "",
      mobile: "",
      houseNo: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });
  const [user, setUser] = useContext(UserContext);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (user.uid) {
      if (didMountRef.current) {
        db.collection(user.uid)
          .doc("address")
          .set(address)
          .catch((error) => {
            console.error("Error adding/editing address: ", error);
          });
      } else {
        didMountRef.current = true;
      }
    }
  }, [address]);

  return (
    <AddressContext.Provider value={[address, setAddress]}>
      {props.children}
    </AddressContext.Provider>
  );
};
