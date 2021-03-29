import React, { useState, useContext } from "react";
import "./Payment.css";
import DeliveryStepper from "./DeliveryStepper";
import { CardsContext } from "../contexts/CardsContext";
import { CartContext } from "../contexts/CartContext";
import Card from "./Card";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import SnackBar from "./SnackBar";

function Payment() {
  const [cards, setCards] = useContext(CardsContext);
  const [cart, setCart] = useContext(CartContext);
  const [error, setError] = useState("");
  const [netBanking, setNetBanking] = useState("none");
  const [upi, setUpi] = useState("");
  const [proceed, setProceed] = useState(false);
  const [type, setType] = useState("");
  const [cardID, setCardID] = useState("");
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  let currentMonth = String(new Date().getMonth() + 1);
  if (currentMonth.length !== 2) {
    currentMonth = "0" + currentMonth;
  }
  const currentYear = String(new Date().getFullYear());

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

  const handlePaymentSelect = (e) => {
    if (e.target.id === "add_card") {
      setType("");
    } else if (e.target.id === "net_banking") {
      setType("net_banking");
      setError("");
    } else if (e.target.id === "upi") {
      setType("upi");
      setError("");
    } else if (e.target.id === "pod") {
      setType("pod");
      setError("");
    } else {
      setType("card");
      setCardID(e.target.id);
      setError("");
    }
  };

  const handleNetBanking = (e) => {
    if (e.target.value !== "none") {
      setNetBanking(e.target.value);
    }
    setError("");
  };

  const handleUpi = (e) => {
    setUpi(e.target.value);
    setError("");
  };

  const handleContinue = () => {
    if (type === "") {
      handleSnackbarAlert("error", "No payment method selected.");
      setError("Please select a payment method.");
    } else if (type === "card") {
      cards.cardsList.forEach((card) => {
        if (String(card.id) === cardID) {
          setCart({
            ...cart,
            payment: {
              type: "CARD",
              title: card.cardName,
              value: card.number.substring(12),
            },
          });
          setProceed(true);
        }
      });
    } else if (type === "net_banking") {
      if (netBanking === "none") {
        setError("Please select a bank for Net Banking.");
      } else {
        setCart({
          ...cart,
          payment: {
            type: "NET BANKING",
            title: "Net Banking",
            value: netBanking,
          },
        });
        setProceed(true);
      }
    } else if (type === "upi") {
      if (upi === "") {
        setError("Please enter an UPI ID.");
      } else {
        setCart({
          ...cart,
          payment: {
            type: "UPI",
            title: "UPI",
            value: upi,
          },
        });
        setProceed(true);
      }
    } else if (type === "pod") {
      setCart({
        ...cart,
        payment: {
          type: "PAY ON DELIVERY",
          title: "POD",
          value: "Cash / Card",
        },
      });
      setProceed(true);
    }
  };

  const handleSnackbarAlert = (type, msg) => {
    setSnackbaralert({
      show: true,
      type: type,
      msg: msg,
    });
  };

  return proceed ? (
    <Redirect to="/place-order" />
  ) : (
    <div className="payment">
      <DeliveryStepper step={1} />
      <div className="payment__body">
        <div className="payment__title">Select a payment method</div>
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
            <div className="hr__line">
              <hr />
            </div>
            <div className="savedCards__list">
              {cards.cardsList && cards.cardsList.length ? (
                cards.cardsList.map((item) => (
                  <div>
                    <input
                      type="radio"
                      id={item.id}
                      name="card"
                      value={item.id}
                      onChange={handlePaymentSelect}
                    />
                    <label for={item.id}>
                      <Card item={item} />
                    </label>
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
          <div className="payment__topBoxButton">
            {error ? <div className="payment__errorNote">{error}</div> : null}
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleContinue}
            >
              Continue
            </Button>
            <div className="payment__topBoxNote">
              You can review this order before it's final.
            </div>
          </div>
        </div>
        <div className="other__methods">
          <div className="other__methodTitle">Another payment method</div>
          <div className="hr__line2">
            <hr />
          </div>
          <div className="add__newCard">
            <input
              type="radio"
              id="add_card"
              name="card"
              value="add_card"
              onChange={handlePaymentSelect}
            />
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
                        <select
                          name="cardMonth"
                          defaultValue={currentMonth}
                          onChange={setExpirymonth}
                        >
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

                        <select
                          name="cardYear"
                          defaultValue={currentYear}
                          onChange={setExpiryyear}
                        >
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
                    <div className="addcard__button">
                      <Button type="submit" variant="contained" size="small">
                        Add your card
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </label>
          </div>
          <div className="net__banking">
            <input
              type="radio"
              id="net_banking"
              name="card"
              value="net_banking"
              onChange={handlePaymentSelect}
            />
            <label for="net_banking">
              <div className="netbanking__container">
                <div className="netbanking__title">Net Banking</div>
                <div className="netbanking__select">
                  <select
                    name="bankname"
                    defaultValue="Choose an option"
                    required
                    onChange={handleNetBanking}
                  >
                    <option value="none">--- SELECT ---</option>
                    <option value="ALLAHABAD BANK">ALLAHABAD BANK </option>
                    <option value="ANDHRA BANK">ANDHRA BANK</option>
                    <option value="AXIS BANK">AXIS BANK</option>
                    <option value="STATE BANK OF INDI">
                      STATE BANK OF INDIA
                    </option>
                    <option value="BANK OF BARODA">BANK OF BARODA</option>
                    <option value="UCO BANK">UCO BANK</option>
                    <option value="UNION BANK OF INDIA">
                      UNION BANK OF INDIA
                    </option>
                    <option value="BANK OF INDIA">BANK OF INDIA</option>
                    <option value="BANDHAN BANK LIMITED">
                      BANDHAN BANK LIMITED
                    </option>
                    <option value="CANARA BANK">CANARA BANK</option>
                    <option value="GRAMIN VIKASH BANK">
                      GRAMIN VIKASH BANK
                    </option>
                    <option value="CORPORATION BANK">CORPORATION BANK</option>
                    <option value="INDIAN BANK">INDIAN BANK</option>
                    <option value="INDIAN OVERSEAS BANK">
                      INDIAN OVERSEAS BANK
                    </option>
                    <option value="ORIENTAL BANK OF COMMERCE">
                      ORIENTAL BANK OF COMMERCE
                    </option>
                    <option value="PUNJAB AND SIND BANK">
                      PUNJAB AND SIND BANK
                    </option>
                    <option value="PUNJAB NATIONAL BANK">
                      PUNJAB NATIONAL BANK
                    </option>
                    <option value="RESERVE BANK OF INDIA">
                      RESERVE BANK OF INDIA
                    </option>
                    <option value="SOUTH INDIAN BANK">SOUTH INDIAN BANK</option>
                    <option value="UNITED BANK OF INDIA">
                      UNITED BANK OF INDIA
                    </option>
                    <option value="CENTRAL BANK OF INDIA">
                      CENTRAL BANK OF INDIA
                    </option>
                    <option value="VIJAYA BANK">VIJAYA BANK</option>
                    <option value="DENA BANK">DENA BANK</option>
                    <option value="BHARATIYA MAHILA BANK LIMITED">
                      BHARATIYA MAHILA BANK LIMITED
                    </option>
                    <option value="FEDERAL BANK LTD">FEDERAL BANK LTD </option>
                    <option value="HDFC BANK LTD">HDFC BANK LTD</option>
                    <option value="ICICI BANK LTD">ICICI BANK LTD</option>
                    <option value="IDBI BANK LTD">IDBI BANK LTD</option>
                    <option value="PAYTM BANK">PAYTM BANK</option>
                    <option value="FINO PAYMENT BANK">FINO PAYMENT BANK</option>
                    <option value="INDUSIND BANK LTD">INDUSIND BANK LTD</option>
                    <option value="KARNATAKA BANK LTD">
                      KARNATAKA BANK LTD
                    </option>
                    <option value="KOTAK MAHINDRA BANK">
                      KOTAK MAHINDRA BANK
                    </option>
                    <option value="YES BANK LTD">YES BANK LTD</option>
                    <option value="SYNDICATE BANK">SYNDICATE BANK</option>
                    <option value="BANK OF INDIA">BANK OF INDIA</option>
                    <option value="BANK OF MAHARASHTRA">
                      BANK OF MAHARASHTRA
                    </option>
                  </select>
                </div>
              </div>
            </label>
          </div>
          <div className="upi__apps">
            <input
              type="radio"
              id="upi"
              name="card"
              value="upi"
              onChange={handlePaymentSelect}
            />
            <label for="upi">
              <form>
                <div className="upipaymentinput__container">
                  <div className="upipayment__title">Other UPI Apps</div>
                  <div className="upipayment__note">
                    Please enter your UPI ID
                  </div>
                  <div className="upipayment__input">
                    <input
                      type="text"
                      name="upiId"
                      placeholder="Ex: MobileNumber@upi"
                      pattern="[0-9@a-z]{14}"
                      required
                      onChange={handleUpi}
                    />
                    {/* <div className="upi__button">
                      <Button variant="contained" size="small">
                        Verify
                      </Button>
                    </div> */}
                  </div>
                </div>
              </form>
            </label>
          </div>
          <div className="pod">
            <input
              type="radio"
              id="pod"
              name="card"
              value="pod"
              onChange={handlePaymentSelect}
            />
            <label for="pod">
              <form>
                <div className="pod__container">
                  <div className="pod__title">Pay on Delivery</div>
                  <div className="pod__note">
                    Pay digitally with SMS Pay Link or Cash.
                  </div>
                </div>
              </form>
            </label>
          </div>
        </div>
        <div className="more__methods">
          <div className="moremethods__leftBox">
            <div className="moremethods__title">More payment options</div>
            <div className="hr__line3">
              <hr />
            </div>
            <div className="moremethods__box">
              <div className="moremethods__innerBoxLeft">
                <div className="moremethodsbox__title">
                  Gift Cards, Vouchers & Promotional Codes
                </div>
                <div>
                  ▶{" "}
                  <span className="moremethodsbox__link">
                    Enter a gift card, voucher or promotional code
                  </span>
                </div>
              </div>
              <div className="moremethods__innerBoxRight">
                <img src="amazon-gc.png" alt="" />
              </div>
            </div>
          </div>
          <div className="payment__bottomBoxButton">
            {error ? <div className="payment__errorNote">{error}</div> : null}
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleContinue}
            >
              Continue
            </Button>
            <div className="payment__bottomBoxNote">
              You can review this order before it's final.
            </div>
          </div>
        </div>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </div>
  );
}

export default Payment;
