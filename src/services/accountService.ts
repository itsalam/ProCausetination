
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore"; 



export async function signInWithGoogle() {
    var credential = firebase.auth.GoogleAuthProvider.credential(null, await getAuthToken());
    firebase.auth().signInWithCredential(credential)
}

export function getAuthToken() : Promise<string>{
    return new Promise((resolve, reject)=> {
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            resolve(token);
        })
    });
}