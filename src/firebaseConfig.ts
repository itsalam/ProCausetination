import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { env } from "process";

console.log(env);

var firebaseConfig = {
  apiKey: "AIzaSyBC_kzI9j-xgib4fCOHYT_5fVs2IM06I0o",
  authDomain: "mnim-6e0bd.firebaseapp.com",
  databaseURL: "https://mnim-6e0bd.firebaseio.com",
  projectId: "mnim-6e0bd",
  storageBucket: "mnim-6e0bd.appspot.com",
  messagingSenderId: "864264210614",
  appId: "1:864264210614:web:2c023ba302f7e2a5d4be17",
  measurementId: "G-5F337NXLYE"
};

firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebase-auth-container", {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },        
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },        
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        },

    ]
})

export const firebaseUI = ui;

  // Initialize Firebase