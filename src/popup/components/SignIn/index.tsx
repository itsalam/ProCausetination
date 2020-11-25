import React, { useEffect } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import { extractHostname } from 'helpers';
import { getAuthToken } from 'popup/services/accountService';
import { AuthUI } from 'firebaseConfig';
import Tab = chrome.tabs.Tab;

function SignIn(){

    var [ui, setUI] = React.useState(AuthUI)

    useEffect(()=>{
    })

    return(
        <div className="signInContainer">
            <div id="firebase-auth-container" data-onsuccess="onSignIn"></div>
        </div>
    )
}

export default SignIn;
