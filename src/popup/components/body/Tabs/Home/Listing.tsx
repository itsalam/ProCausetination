import React, { useEffect } from 'react';
import { extractHostname } from 'helpers';
import Tab = chrome.tabs.Tab;

function Listing(props:{name:string, app: Tab}){

    useEffect(()=>{

    })

    return(
        <li className="site-list-entry">
            <img src={props.app.favIconUrl} alt=""/>
            <p>{props.name}</p>
        </li>
    )
}

export default Listing; 