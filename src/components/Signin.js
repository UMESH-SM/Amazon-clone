import React, { useContext, useState } from "react";
import "./Signin.css";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@material-ui/core";
import { db, fire } from "../firebase_config";
import { Link, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function Signin() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    setLoading(true);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        db.collection(userCredential.user.uid)
          .doc("user-info")
          .get()
          .then((doc) => {
            setLoading(false);
            if (doc.exists) {
              const user_info = doc.data();
              setUser({
                name: user_info.name,
                email: user_info.email,
                uid: userCredential.user.uid,
              });
              console.log("Sign-in successful.");
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error signing-in: ", error);
          });
      })
      .catch((error) => {
        setSignInError(error.message);
        setLoading(false);
      });
  };

  const handleEmailChange = (e) => {
    if (signInError) {
      setSignInError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (signInError) {
      setSignInError("");
    }
    setPassword(e.target.value);
  };

  return user.uid ? (
    <Redirect to="/" />
  ) : (
    <div className="signin">
      <div className="signin__logo">
        <img src="amazon-logo2.png" alt="" />
      </div>
      <form className="signin__card" onSubmit={handleContinue}>
        <div className="signin__title">Sign-In</div>
        <div className="signin__input">
          <label>Email address</label>
          <br />
          <input
            type="text"
            name="email"
            required
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />

          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            onChange={handlePasswordChange}
          />
          <p className="error__line">{signInError}</p>
        </div>
        {loading ? (
          <div className="signin__loading">
            <CircularProgress style={{ color: "grey" }} />
          </div>
        ) : null}
        <div className="signin__continue">
          <Button
            variant="contained"
            size="small"
            type="submit"
            disableElevation
          >
            Continue
          </Button>
        </div>
        <p className="signin__note">
          By continuing, you agree to Amazon clone's Conditions of Use and
          Privacy Notice.
        </p>
      </form>
      <div className="create__account">
        <div className="new__toAmazon">
          <span>
            <hr></hr>
          </span>
          <span className="newtoamazon__text">New to Amazon clone ?</span>
          <span>
            <hr></hr>
          </span>
        </div>
        <div className="create__button">
          <Link className="create__accountlink" to="/signup">
            <Button variant="contained" size="small" disableElevation>
              Create your Amazon clone account
            </Button>
          </Link>
        </div>
      </div>
      <div className="signin__needHelp"></div>
    </div>
  );
}

export default Signin;
