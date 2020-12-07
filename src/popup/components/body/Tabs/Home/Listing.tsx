import { millisToMinutesAndSeconds } from 'helpers';
import React, { useEffect } from 'react';
import { getActiveApp } from 'Services/appService';
import { getStorage } from 'Services/storageService';
import { ActiveAppInfo, AppInfo, Session } from 'types';

export function Listing(props:{ app: AppInfo }){

    var [listingInfo, setListingInfo] = React.useState();

    return(
        <li className="site-list-entry">
            <img src={props.app.favIconUrl} alt=""/>
            <p>{props.app.name}</p>
            <p>{millisToMinutesAndSeconds(props.app.remainingTime)}</p>
        </li>
    )
}

export function ActiveListing(props:{ app: ActiveAppInfo, currentSession: Session }){

    var [listingInfo, setListingInfo] = React.useState();

    return(
        <li className="site-list-entry active">
            <img src={props.app.favIconUrl} alt=""/>
            <p>{props.app.name}</p>
            <p>{millisToMinutesAndSeconds(props.currentSession? props.currentSession.remainingTime : props.app.currentSession.remainingTime)}</p>
        </li>
    )
}
