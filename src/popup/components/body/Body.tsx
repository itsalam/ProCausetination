import React, { useEffect } from 'react';
import {getCurrentApps} from '../../services/ListApps';
import Listing from './Listing';
import Tab = chrome.tabs.Tab;
import './Body.scss';

function Body(){
    
    var [apps, setApps] = React.useState<Tab[]>();

    useEffect(() => {
        const updateBlockedApps = async () => {
            setApps(await getCurrentApps());
        }
        // Update the document title using the browser API
        updateBlockedApps();
    }, []);

    return(
        <div className="container">
            <ul>
                {apps && apps.map(app => <Listing app={app}/>)}
            </ul>
        </div>
    )
}

export default Body