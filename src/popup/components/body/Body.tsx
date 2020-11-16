import React, { useEffect } from 'react';
import {getCurrentApps} from '../../../services/ListApps';
import Listing from './Listing';
import Tab = chrome.tabs.Tab;
import './Body.scss';

function Body(){
    
    var [apps, setApps] = React.useState<{name:string, app:Tab}[]>();

    useEffect(() => {
        const updateBlockedApps = async () => {
            let appMap = await getCurrentApps();
            setApps(Array.from(appMap, ([name, app]) => ({ name, app })));
            console.log(apps)
        }
        // Update the document title using the browser API
        updateBlockedApps();
    }, []);

    return(
        <div className="container">
            <ul>
                {apps && apps.map(({name, app}) => <Listing name={name} app={app}/>)}
            </ul>
        </div>
    )
}

export default Body