import React, { Fragment, useEffect } from 'react';
import {getActiveApp, getCurrentApps} from 'Services/appService';
import './Home.scss';
import SignIn from 'SignIn';
import { ActiveAppInfo, AppInfo, Session, Storage } from 'types';
import {Listing, ActiveListing} from './Listing'
import { getStorage } from 'Services/storageService';
import Tab = chrome.tabs.Tab;

function Home(){
    
    var [apps, setApps] = React.useState<AppInfo[]>();
    var [activeApp, setActiveApp] = React.useState<ActiveAppInfo>();
    var [currentSession, setCurrentSession] = React.useState<Session>();

    const updateBlockedApps = async () => {
        let appMap = await getCurrentApps();
        let activeApp = await getActiveApp();
        setActiveApp(activeApp);
        setApps(Array.from(appMap, ([_, app]) => app ));
    }

    useEffect(() => {
        getUpdates();
        updateBlockedApps()
    },[]);

    const getUpdates = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
            setCurrentSession(message);
        })
    }


    const getListings = () => {
        if (!apps || apps.length === 0) {
            return <p>No apps have been added yet.</p>
        }
        let listings: (AppInfo|ActiveAppInfo)[] = apps; 
        if(activeApp !== undefined && currentSession !== undefined){
            return (<Fragment>
                <ActiveListing app={activeApp} currentSession={currentSession}/>
                {apps.filter( app => {return activeApp && app.name !== activeApp.name}).map(app => <Listing app={app}/>)}
            </Fragment>
            )
        }
        return listings.map(app => <Listing app={app}/>)
    }

    return(
        <div className="homecontainer">
            <div className="listContainer">
                <ul>
                    {getListings()}
                </ul>
            </div>
            <div className="homeFooter">
                <div className="cashCard card">
                    <p>Total ad views:</p>
                    <div>
                        
                        <i className="las la-hand-holding-heart"/>
                    </div>
                </div>
                <div>
                    <SignIn/>
                </div>
            </div>
        </div>
    )
}

export default Home;