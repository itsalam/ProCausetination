import React from 'react';
import {WebAppListing} from '../types';

function Listing(props:{app: WebAppListing}){
    return(
        <li>
            <img src={props.app.icon} alt=""/>
            <h6>{props.app.name}</h6>
        </li>
    )
}

export default Listing;