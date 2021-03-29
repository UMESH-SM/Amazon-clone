import React, { useState, useContext } from "react";
import "./Delivery.css";
import Header from "./Header";
import ManageAddress from "./ManageAddress";
import NewAddress from "./NewAddress";
import EditAddress from "./EditAddress";
import { AddressContext } from "../contexts/AddressContext";
import SnackBar from "./SnackBar";

function ManageAddressPage() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [address, setAddress] = useContext(AddressContext);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleEdit = (id) => {
    setEditId(id);
    setEdit(true);
  };

  const handleSnackbarAlert = (type, msg) => {
    setSnackbaralert({
      show: true,
      type: type,
      msg: msg,
    });
  };

  return (
    <div className="delivery">
      <Header />
      <div className="delivery__body">
        {edit ? null : (
          <>
            <div className="delivery__title">Manage addresses</div>
            <div className="delivery__note">
              Is the address you'd like to use displayed below? If not, you can{" "}
              <a href="#address">enter a new delivery address.</a>
            </div>
            <div className="savedAddress__section">
              <div className="savedAddress__title">Defaut address</div>
              <div className="savedAddress__container">
                {address.defaultAddress && address.defaultAddress.id ? (
                  <ManageAddress
                    dfltAdrs={true}
                    item={address.defaultAddress}
                    handleEdit={handleEdit}
                    handleSnackbarAlert={handleSnackbarAlert}
                  />
                ) : (
                  <div className="empty__address">
                    <img src="empty-address.png" alt="" />
                    <span>No default address.</span>
                  </div>
                )}
              </div>
            </div>
            <div className="horizontal__line">
              <hr></hr>
            </div>
            <div className="savedAddress__section">
              <div className="savedAddress__title">Saved addresses</div>
              <div className="savedAddress__container">
                {address.addressList && address.addressList.length ? (
                  address.addressList.map((item) => (
                    <ManageAddress
                      key={item.id}
                      dfltAdrs={false}
                      item={item}
                      handleEdit={handleEdit}
                      handleSnackbarAlert={handleSnackbarAlert}
                    />
                  ))
                ) : (
                  <div className="empty__address">
                    <img src="empty-address.png" alt="" />
                    <span>No saved address.</span>
                  </div>
                )}
              </div>
            </div>
            <div className="horizontal__line">
              <hr></hr>
            </div>
          </>
        )}
        <div className="newAdress__section" id="address">
          <div className="newAddress__title">
            {edit ? "Edit address" : "Add a new address"}
          </div>
          <div className="newAddress__container">
            {edit ? (
              <EditAddress
                editId={editId}
                setEdit={setEdit}
                handleSnackbarAlert={handleSnackbarAlert}
              />
            ) : (
              <NewAddress handleSnackbarAlert={handleSnackbarAlert} />
            )}
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

export default ManageAddressPage;
