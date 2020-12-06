import React, { useEffect } from 'react';
import { extractHostname } from 'helpers';
import { getAuthToken } from 'services/accountService';
import Tab = chrome.tabs.Tab;

function SignIn(){

    useEffect(()=>{
        const getAuthDetails = async () => {
            console.log(await getAuthToken());
        }

        getAuthDetails();
    })

    return(
        <div className="signInContainer">

        </div>
    )
}

export default SignIn;
