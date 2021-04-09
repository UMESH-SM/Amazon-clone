import React, { useState, useContext, useEffect } from "react";
import "./Address.css";
import { AddressContext } from "../contexts/AddressContext";
import { Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ConfirmBox from "./ConfirmBox";

function ManageAddress({ dfltAdrs, item, handleEdit, handleSnackbarAlert }) {
  const [address, setAddress] = useContext(AddressContext);
  const [confirmbox, setConfirmbox] = useState({
    show: false,
    title: "",
    text: "",
    ok: "",
    no: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    handleSnackbarAlert("success", "Address set as defaut.");
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
    handleSnackbarAlert("success", "Address removed from default.");
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

  return (
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
            <Button variant="contained" size="small">
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

export default ManageAddress;
