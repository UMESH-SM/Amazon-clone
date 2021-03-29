import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD9QzgaNpdhSC7XuE8vtYzFwUMB328s-Fo",
  authDomain: "umeshsm-amzn-clone.firebaseapp.com",
  projectId: "umeshsm-amzn-clone",
  storageBucket: "umeshsm-amzn-clone.appspot.com",
  messagingSenderId: "766916624831",
  appId: "1:766916624831:web:b329b9938666bce954210a",
};
export const fire = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
