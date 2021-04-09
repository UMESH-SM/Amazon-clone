import React, { useState, useContext, useEffect } from "react";
import "./Payment.css";
import Header from "./Header";
import { CardsContext } from "../contexts/CardsContext";
import ManageCard from "./ManageCard";
import { Button } from "@material-ui/core";
import SnackBar from "./SnackBar";
import ConfirmBox from "./ConfirmBox";

function ManageCardsPage() {
  const [cards, setCards] = useContext(CardsContext);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [confirmbox, setConfirmbox] = useState({
    show: false,
    title: "",
    text: "",
    ok: "",
    no: "",
  });
  const [cardToDelete, setCardToDelete] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let cardname = "";
  let cardnumber = "";
  let nameoncard = "";
  let expirymonth = "01";
  let expiryyear = "2021";
  let cardtype = "visa";

  const setCardname = (e) => {
    cardname = e.target.value;
  };

  const setCardnumber = (e) => {
    cardnumber = e.target.value;
  };

  const setNameoncard = (e) => {
    nameoncard = e.target.value;
  };

  const setExpirymonth = (e) => {
    expirymonth = e.target.value;
  };

  const setExpiryyear = (e) => {
    expiryyear = e.target.value;
  };

  const setCardtype = (e) => {
    cardtype = e.target.value;
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    setCards({
      cardsList: [
        ...cards.cardsList,
        {
          id: new Date().getTime(),
          cardName: cardname,
          number: cardnumber,
          nameOnCard: nameoncard,
          expiryMonth: expirymonth,
          expiryYear: expiryyear,
          type: cardtype,
        },
      ],
    });
    handleSnackbarAlert("success", "Card with name " + cardname + " saved.");
    e.target.reset();
    window.scrollTo(0, 0);
  };

  const handleSnackbarAlert = (type, msg) => {
    setSnackbaralert({
      show: true,
      type: type,
      msg: msg,
    });
  };

  const handleDeleteCard = () => {
    setCards({
      cardsList: cards.cardsList.filter((card) => card.id !== cardToDelete.id),
    });
    handleSnackbarAlert(
      "success",
      "Card with name " + cardToDelete.name + " deleted."
    );
    setCardToDelete({
      id: "",
      name: "",
    });
  };

  const handleCardDeleteConfirm = (id, name) => {
    setCardToDelete({
      id: id,
      name: name,
    });
    setConfirmbox({
      show: true,
      title: "Delete card ",
      text: "Are you sure?",
      ok: "Continue",
      no: "cancel",
    });
  };

  const handleConfirmBoxConfirm = () => {
    setConfirmbox({
      ...confirmbox,
      show: false,
    });
    handleDeleteCard();
  };

  return (
    <div className="payment">
      <Header />
      <div className="payment__body" style={{ marginLeft: "15%" }}>
        <div className="payment__title">Manage cards</div>
        <div className="payment__topBox">
          <div className="saved__cards">
            <div className="cards__heading">
              <div className="heading__title">
                Your saved credit and debit cards
              </div>
              {cards.cardsList && cards.cardsList.length ? (
                <>
                  <div className="heading__noc">Name on card</div>
                  <div className="heading__expiry">Expires on</div>
                </>
              ) : null}
            </div>
            <div className="hr__line" style={{ marginBottom: "5%" }}>
              <hr />
            </div>
            <div className="savedCards__list">
              {cards.cardsList && cards.cardsList.length ? (
                cards.cardsList.map((item) => (
                  <div>
                    <ManageCard
                      item={item}
                      handleCardDeleteConfirm={handleCardDeleteConfirm}
                    />
                  </div>
                ))
              ) : (
                <div className="empty__card">
                  <img src="empty-card.png" alt="" />
                  <span>No saved cards.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="other__methods"
          style={{ paddingTop: "2%", paddingBottom: "2%" }}
        >
          <div className="other__methodTitle">Another payment method</div>
          <div className="hr__line2" style={{ marginBottom: "5%" }}>
            <hr />
          </div>
          <div className="add__newCard">
            <label for="add_card">
              <form onSubmit={handleAddCard}>
                <div className="addnewcard__container">
                  <div className="addcard__title">
                    Add Debit/Credit/ATM Card
                  </div>
                  <div className="card__images">
                    <img src="visa.png" alt="" />
                    <img src="rupay.png" alt="" />
                    <img src="mastercard.png" alt="" />
                    <img src="americanexpress.png" alt="" />
                    <img src="maestro.png" alt="" />
                  </div>
                  <div className="addcard__note">
                    We’ll save this card for your convenience. Remove it by
                    going to Your Account section.
                  </div>
                  <div className="addcardname__input">
                    <label className="addcardlabel__options">Card name</label>
                    <input
                      type="text"
                      name="cardname"
                      required
                      onChange={setCardname}
                      defaultValue={cardname}
                    />
                  </div>
                  <div className="carddetails__input">
                    <div className="cardtype__input">
                      <label className="addcardlabel__options" for="cardType">
                        Card type
                      </label>
                      <select name="cardType" onChange={setCardtype}>
                        <option value="visa">Visa</option>
                        <option value="rupay">Rupay</option>
                        <option value="mastercard">MasterCard</option>
                        <option value="americanexpress">
                          American Express
                        </option>
                        <option value="maestro">Maestro</option>
                      </select>
                    </div>
                    <div className="nameoncard__input">
                      <label className="addcardlabel__options" for="noc">
                        Name on card
                      </label>
                      <input
                        name="noc"
                        type="text"
                        required
                        onChange={setNameoncard}
                        defaultValue={nameoncard}
                      />
                    </div>
                    <div className="cardnumber__input">
                      <label className="addcardlabel__options" for="cardNumber">
                        Card number
                      </label>
                      <input
                        name="cardNumber"
                        type="text"
                        pattern="[0-9]{16}"
                        required
                        onChange={setCardnumber}
                        defaultValue={cardnumber}
                      />
                    </div>
                    <div className="expirydate__input">
                      <label className="addcardlabel__options">
                        Expiry date
                      </label>
                      <div className="twoselect__input">
                        <select name="cardMonth" onChange={setExpirymonth}>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>

                        <select name="cardYear" onChange={setExpiryyear}>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                          <option value="2033">2033</option>
                          <option value="2034">2034</option>
                          <option value="2035">2035</option>
                          <option value="2036">2036</option>
                          <option value="2037">2037</option>
                          <option value="2038">2038</option>
                          <option value="2039">2039</option>
                          <option value="2040">2040</option>
                          <option value="2041">2041</option>
                        </select>
                      </div>
                    </div>
                    <div
                      className="addcard__button"
                      style={{ marginTop: "2%" }}
                    >
                      <Button type="submit" variant="contained" size="small">
                        Add your card
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </label>
          </div>
        </div>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
      {confirmbox.show ? (
        <ConfirmBox
          confirmbox={confirmbox}
          setConfirmbox={setConfirmbox}
          handleConfirmBoxConfirm={handleConfirmBoxConfirm}
        />
      ) : null}
    </div>
  );
}

export default ManageCardsPage;
