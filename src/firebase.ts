import firebase from "firebase/app";
import { env } from "process";

const firebaseConfig = {
    apiKey: env.apiKey,
    databaseURL: env.databaseURL,
    storageBucket: env.storageBucket
  };

  console.log(env);
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);