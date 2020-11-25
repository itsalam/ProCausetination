import React, { useEffect } from 'react';
import { AppInfo } from 'types';

function Listing(props:{name:string, app: AppInfo}){

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