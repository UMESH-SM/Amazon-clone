import React, { useState, useContext } from "react";
import "./Address.css";
import { AddressContext } from "../contexts/AddressContext";
import { CartContext } from "../contexts/CartContext";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ConfirmBox from "./ConfirmBox";

function Address({ dfltAdrs, item, handleEdit, handleSnackbarAlert }) {
  const [address, setAddress] = useContext(AddressContext);
  const [cart, setCart] = useContext(CartContext);
  const [proceed, setProceed] = useState(false);
  const [confirmbox, setConfirmbox] = useState({
    show: false,
    title: "",
    text: "",
    ok: "",
    no: "",
  });

  const {
    id,
    name,
    houseNo,
    street,
    city,
    landmark,
    state,
    pincode,
    country,
    mobile,
  } = item;

  const handleDeleteAddress = () => {
    if (address.defaultAddress.id === id) {
      setAddress({
        addressList: address.addressList.filter((item) => item.id !== id),
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
      window.scrollTo(0, 0);
    } else {
      setAddress({
        addressList: address.addressList.filter((item) => item.id !== id),
        defaultAddress: {
          ...address.defaultAddress,
        },
      });
    }

    handleSnackbarAlert("success", "Address deleted.");
  };

  const handleDeliverToThisAddress = () => {
    setCart({
      ...cart,
      address: {
        id,
        name,
        mobile,
        houseNo,
        street,
        city,
        landmark,
        pincode,
        state,
        country,
      },
    });
    setProceed(true);
  };

  const handleDeafultToThisAddress = () => {
    setAddress({
      addressList: [...address.addressList],
      defaultAddress: {
        id,
        name,
        mobile,
        houseNo,
        street,
        city,
        landmark,
        pincode,
        state,
        country,
      },
    });
    const type = "success";
    const msg = "Address set as default.";
    handleSnackbarAlert(type, msg);
    window.scrollTo(0, 0);
  };

  const handleRemoveDeafultAddress = () => {
    setAddress({
      addressList: [...address.addressList],
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
    const type = "success";
    const msg = "Address removed from default.";
    handleSnackbarAlert(type, msg);
    window.scrollTo(0, 0);
  };

  const handleAddressDeleteConfirm = () => {
    setConfirmbox({
      show: true,
      title: "Delete address",
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
    handleDeleteAddress();
  };

  return proceed ? (
    <Redirect to="/payment" />
  ) : (
    <div className="address">
      <div className="address__name">{name}</div>
      <div className="address__houseNo">{houseNo}</div>
      <div className="address__street">{street}</div>
      <div className="address__landmark">{landmark}</div>
      <div className="address__city">{city}</div>
      <div className="address__statePincode">{state + " - " + pincode}</div>
      <div className="address__country">{country}</div>
      <div className="address__mobile">Mobile no : {mobile}</div>
      {dfltAdrs ? (
        <>
          <div className="default__deliveryButton">
            <Button
              variant="contained"
              size="small"
              onClick={handleDeliverToThisAddress}
            >
              <CheckCircleIcon style={{ color: "green" }} />
              &nbsp;Default delivery
            </Button>
          </div>
          <div className="address__defaultButton">
            <Button
              variant="contained"
              size="small"
              onClick={handleRemoveDeafultAddress}
            >
              Remove
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="address__deliverButton">
            <Button
              variant="contained"
              size="small"
              onClick={handleDeliverToThisAddress}
            >
              Deliver to this address
            </Button>
          </div>
          <div className="address__defaultButton">
            <Button
              variant="contained"
              size="small"
              onClick={handleDeafultToThisAddress}
            >
              Set as default address
            </Button>
          </div>
          <div className="address__editDeleteButtons">
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEdit(id)}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={handleAddressDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </>
      )}
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

export default Address;
