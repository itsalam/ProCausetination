import React, { useEffect } from 'react';
import { extractHostname } from '../../../helpers';
import Tab = chrome.tabs.Tab;

function Listing(props:{app: Tab}){

    var [name, setName] = React.useState<string|null>();

    useEffect(()=>{
        console.log(props.app)
        if (props.app.url === undefined) {
            console.log("Error: tabs not found");
            console.log(props.app);
        } else {
            setName(props.app.url? extractHostname(props.app.url) : "");
        }

    })

    return(
        <li className="site-list-entry">
            <img src={props.app.favIconUrl} alt=""/>
            <h6>{name}</h6>
        </li>
    )
}

export default Listing; 