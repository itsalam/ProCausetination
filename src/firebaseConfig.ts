import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { env } from "process";

console.log(process)

const firebaseConfig = {
    apiKey: env.apiKey,
    databaseURL: env.databaseURL,
    storageBucket: env.storageBucket
  };

firebase.initializeApp(firebaseConfig)

var AuthUI = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
}
AuthUI.start('#firebase-auth-container', uiConfig);

export { AuthUI };
  // Initialize Firebase
export default firebase;