import firebase from "firebase/app";
import { env } from "process";

const firebaseConfig = {
    apiKey: env.apiKey,
    databaseURL: env.databaseURL,
    storageBucket: env.storageBucket
  };

const intializeFirebase = firebase.initializeApp(firebaseConfig)
  // Initialize Firebase
export default intializeFirebase;