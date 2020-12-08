import React, { useEffect } from 'react';
import { extractHostname } from 'helpers';
import { getAuthToken } from 'services/accountService';
import "./signin.scss";
import Tab = chrome.tabs.Tab;

function SignIn(){

    useEffect(()=>{
    })

    return(
        <div className="signInContainer" id="firebase-auth-container">

        </div>
    )
}

export default SignIn;
