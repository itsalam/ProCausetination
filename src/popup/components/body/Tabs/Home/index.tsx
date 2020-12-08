import React, { useEffect } from 'react';
import {getCurrentApps} from 'services/currentApps';
import './Home.scss';
import SignIn from 'popup/components/signIn';
import Listing from './listing';
import Tab = chrome.tabs.Tab;

function Home(){
    
    var [apps, setApps] = React.useState<{name:string, app:Tab}[]>();

    useEffect(() => {
        const updateBlockedApps = async () => {
            let appMap = await getCurrentApps();
            setApps(Array.from(appMap, ([name, app]) => ({ name, app })));
        }
        // Update the document title using the browser API
        updateBlockedApps();
    }, []);

    return(
        <div className="homecontainer">
            <div className="listContainer">
                <ul>
                    {(apps && apps.length > 0)? 
                        apps.map(({name, app}) => <Listing name={name} app={app}/>)
                        :
                        <p>No apps have been added yet.</p>
                    }
                </ul>
            </div>
            <div className="homeFooter">
                <div className="cashCard card">
                    <p>Total ad views:</p>
                    <div>
                        
                        <i className="las la-hand-holding-heart"/>
                    </div>
                </div>
                <SignIn/>
            </div>
        </div>
    )
}

export default Home;