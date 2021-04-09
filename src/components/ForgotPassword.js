import React, { useState } from "react";
import "./ForgotPassword.css";
import { Button } from "@material-ui/core";
import { fire } from "../firebase_config";
import SnackBar from "./SnackBar";
import { Redirect } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [proceed, setProceed] = useState(false);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setSnackbaralert({
          show: true,
          type: "success",
          msg: "Password reset link has been sent to " + email,
        });
        setTimeout(() => {
          setProceed(true);
        }, 3000);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setSnackbaralert({
            show: true,
            type: "error",
            msg: "The Email you entered is not registered.",
          });
        }
      });
  };

  return proceed ? (
    <Redirect to="/signin" />
  ) : (
    <>
      <div className="forgotpassword">
        <form onSubmit={handleForgotPassword}>
          <div className="forgotpassword__container">
            <div className="forgotpassword__title">Forgot Password</div>
            <label>Enter your registered Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              minLength="6"
              autoFocus
              required
            />
            <span className="fotgotpassword__note">
              A password reset link will be sent to your email. Check under spam
              if not found in Inbox.
            </span>
            <div className="forgotpassword__button">
              <Button variant="contained" type="submit" disableElevation>
                Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
      {snackbaralert.show ? (
        <SnackBar
          snackbaralert={snackbaralert}
          setSnackbaralert={setSnackbaralert}
        />
      ) : null}
    </>
  );
}

export default ForgotPassword;
