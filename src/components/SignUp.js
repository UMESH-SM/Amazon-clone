import React, { useContext, useState } from "react";
import "./SignUp.css";
import { UserContext } from "../contexts/UserContext";
import { Button, CircularProgress } from "@material-ui/core";
import { fire, db } from "../firebase_config";
import { Link, Redirect } from "react-router-dom";
import SnackBar from "./SnackBar";

function SignUp() {
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [snackbaralert, setSnackbaralert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    let actionCodeSettings = {
      url: "http://localhost:3000/",
    };

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            userCredential.user
              .sendEmailVerification(actionCodeSettings)
              .then(() => {
                console.log("Verification email sent.");
                setLoading(false);
              })
              .catch((error) => {
                console.log("Error sending verification email : " + error);
              });
            storeUserData(userCredential.user);
            setUser({
              name: name,
              email: email,
              uid: userCredential.user.uid,
            });
          });
      })
      .catch((error) => {
        setSignUpError(error.message);
        setLoading(false);
      });
  };

  function storeUserData(user) {
    db.collection(user.uid)
      .doc("user-info")
      .set({
        name: name,
        email: email,
      })
      .then(() => {
        console.log("Sign-up successful.");
      })
      .catch((error) => {
        console.error("Error signing-up: ", error);
      });

    db.collection(user.uid)
      .doc("address")
      .set({
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

    db.collection(user.uid)
      .doc("cart")
      .set({
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

    db.collection(user.uid).doc("cards").set({
      cardsList: [],
    });

    db.collection(user.uid).doc("orders").set({
      ordersList: [],
    });
  }

  const handleNameChange = (e) => {
    if (signUpError) {
      setSignUpError("");
    }
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    if (signUpError) {
      setSignUpError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (signUpError) {
      setSignUpError("");
    }
    setPassword(e.target.value);
  };

  const handleVerifyEmailContinue = () => {
    fire.auth().currentUser.reload();
    setTimeout(() => {
      if (fire.auth().currentUser.emailVerified) {
        setSnackbaralert({
          show: true,
          type: "success",
          msg: "Welcome " + user.name + " 😊",
        });
        setTimeout(() => {
          setVerified(true);
        }, 2000);
      } else {
        setSnackbaralert({
          show: true,
          type: "error",
          msg: "Email not verified.",
        });
      }
    }, 1000);
  };

  return user.uid ? (
    verified ? (
      <Redirect to="/" />
    ) : (
      <div className="verify__emailContainer">
        <div className="verify__emailCard">
          <img
            src="https://lh3.googleusercontent.com/proxy/wEjPeMSwWrQPG2Fuw575z3qFn8AD4NohB5hsv5RDkkN_MM6pdWjJbd4Bin7jD9vZu0KDY73uwwA1AOoGcx39QhNU0W-0WdYwTyOfOvFePyArErXPEty6ADCgUkzSPEPUwTuk0kRiMrDpfIGKaa41uevvEq96nfQ"
            alt=""
          />
          <div>
            <div>
              A verification link has been sent to your email <b>{email}</b>.
            </div>
            <div> Please verify to continue.</div>
          </div>
          <>
            <p className="verify__emailNote">
              After verifying click on continue.
            </p>
            <span className="verify__emailButton">
              <Button
                variant="contained"
                size="small"
                onClick={handleVerifyEmailContinue}
              >
                Continue
              </Button>
              {snackbaralert.show ? (
                <SnackBar
                  snackbaralert={snackbaralert}
                  setSnackbaralert={setSnackbaralert}
                />
              ) : null}
            </span>
          </>
        </div>
      </div>
    )
  ) : (
    <div className="signup">
      <div className="signup__logo">
        <img src="amazon-logo2.png" alt="" />
      </div>
      <div className="signup__card">
        <div className="signup__title">Create Account</div>
        <form onSubmit={handleSignUp}>
          <div className="signup__input">
            <label>Your name</label>
            <br />
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              autoFocus
              onChange={handleNameChange}
            />

            <label>Email address</label>
            <br />
            <input
              type="text"
              name="email"
              required
              autoComplete="email"
              onChange={handleEmailChange}
            />

            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              required
              placeholder="At least 6 characters"
              onChange={handlePasswordChange}
            />
            <p className="error__line">{signUpError}</p>
          </div>
          {loading ? (
            <div className="signin__loading">
              <CircularProgress style={{ color: "grey" }} />
            </div>
          ) : null}
          <div className="signup__continue">
            <Button
              variant="contained"
              size="small"
              type="submit"
              disableElevation
            >
              Continue
            </Button>
          </div>
        </form>
        <div className="signup_note">
          We will send you a text to verify your phone. Message and Data rates
          may apply.
        </div>
      </div>
      <div className="signup__account">
        Already have an account? <Link to="/signin">Sign in ▸</Link>
      </div>
      <div className="signup__needHelp"></div>
    </div>
  );
}

export default SignUp;
