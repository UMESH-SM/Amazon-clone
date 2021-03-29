import React, { useState, useContext } from "react";
import "./ManageAccount.css";
import Header from "./Header";
import EditUsername from "./EditUsername";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { Button } from "@material-ui/core";
import { db, fire } from "../firebase_config";
import SnackBar from "./SnackBar";
import ConfirmBox from "./ConfirmBox";
import AlertBox from "./AlertBox";

function ManageAccount() {
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
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
  const [alertbox, setAlertbox] = useState({
    show: false,
    title: "",
    text: "",
  });

  const handleDeleteAccountConfirm = () => {
    setConfirmbox({
      show: true,
      title: "Delete account",
      text: "Are you sure?",
      ok: "Continue",
      no: "cancel",
    });
  };

  const handleDeleteAccount = () => {
    const cur_user = fire.auth().currentUser;
    const user_id = user.uid;

    setSnackbaralert({
      show: true,
      type: "success",
      msg: "Account deleted.",
    });
    setTimeout(() => {
      db.collection(user_id).doc("address").delete();
      db.collection(user_id).doc("cards").delete();
      db.collection(user_id).doc("cart").delete();
      db.collection(user_id).doc("orders").delete();
      db.collection(user_id)
        .doc("user-info")
        .delete()
        .then(() => {
          setUser({
            name: "",
            email: "",
            uid: "",
          });
          setCart({
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
          fire
            .auth()
            .signOut()
            .then(() => {
              cur_user
                .delete()
                .then(() => {
                  console.log("Account deleted.");
                })
                .catch((error) => {
                  console.log("Error deleting account : " + error);
                });
            });
        });
    }, 1500);
  };

  const handleResetPasswordConfirm = () => {
    setConfirmbox({
      show: true,
      title: "Reset password",
      text: "Are you sure?",
      ok: "Continue",
      no: "cancel",
    });
  };

  const handleResetPassword = () => {
    fire
      .auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg: "Password reset email has been sent to " + user.email,
        });
        setAlertbox({
          show: true,
          title: "Reset password",
          text:
            "An email has been sent to " +
            user.email +
            ". Please check spam folder if not found in inbox.",
        });
      });
  };

  const handleConfirmBoxConfirm = () => {
    setConfirmbox({
      ...confirmbox,
      show: false,
    });
    if (confirmbox.title === "Delete account") {
      handleDeleteAccount();
    }
    if (confirmbox.title === "Reset password") {
      handleResetPassword();
    }
  };

  return (
    <div className="manageaccount">
      <Header />
      <div className="manageaccount__container">
        <div className="manageaccount__title">Manage account</div>
        <div className="manageaccount__details">
          <table>
            <tr>
              <th>NAME</th>
              <td className="manageaccount__name">
                <input type="text" name="name" value={user.name} />
              </td>
            </tr>
            <tr>
              <th>EMAIL</th>
              <td className="manageaccount__email">
                <input type="text" name="name" value={user.email} />
              </td>
            </tr>
          </table>
        </div>
        <div className="manageaccount__buttons">
          <EditUsername oldUsername={user.name} />
          <div className="manageaccount__editBtn">
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleResetPasswordConfirm}
            >
              Reset Password
            </Button>
          </div>
          <div className="manageaccount__deleteBtn">
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={handleDeleteAccountConfirm}
            >
              Delete account
            </Button>
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
      {alertbox.show ? (
        <AlertBox alertbox={alertbox} setAlertbox={setAlertbox} />
      ) : null}
    </div>
  );
}

export default ManageAccount;
