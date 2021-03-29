import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import { db } from "../firebase_config";

export const CardsContext = createContext();

export const CardsProvider = (props) => {
  const [cards, setCards] = useState({
    cardsList: [],
  });
  const [user, setUser] = useContext(UserContext);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (user.uid) {
      if (didMountRef.current) {
        db.collection(user.uid)
          .doc("cards")
          .set(cards)
          .catch((error) => {
            console.error("Error adding card details: ", error);
          });
      } else {
        didMountRef.current = true;
      }
    }
  }, [cards]);

  return (
    <CardsContext.Provider value={[cards, setCards]}>
      {props.children}
    </CardsContext.Provider>
  );
};
