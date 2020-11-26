import { extractHostname } from "../helpers";
import { AppInfo, Storage, WebAppListing, Session, ActiveAppInfo } from "../types";
import { getStorage, setStorage } from "./storageService";
import { createSession, startSession } from "./timerService";
import Tab = chrome.tabs.Tab;

export const getCurrentApps = async () : Promise<Map<string, AppInfo>> => {
    return await getStorage(Storage.BlockedSites);
}

export const setAppAsActive = async (tabName: string) : Promise<boolean> => {
    var blockedSites = await getCurrentApps();
    if (blockedSites.has((tabName))){
        
        let app = blockedSites.get(tabName)
        if (!app) throw "Application not found"
        let session = createSession(app)
        let sessionId = startSession(session, 1)

        let activeApp : ActiveAppInfo = {...app, currentSession: session, sessionId}
        console.log(activeApp)
        await setStorage(Storage.ActiveSite, activeApp);
        return true;
    }
    return false;
}

export const updateActiveApp = async (fields: any) : Promise<boolean> => {
    var activeApp : ActiveAppInfo = await getStorage(Storage.ActiveSite);
    activeApp = { ...fields, ...activeApp};
    await setStorage(Storage.ActiveSite, activeApp);
    return true;
}


export const addBlockedApp = async (tab: Tab, time?: number) : Promise<void> => {
    var name = extractHostname(tab?.url!);
    if(!name){
        console.log("Invalid domain found. Alert the user with a toast!")
        return;
    }
    if(!time){
        time = ({"defaultTime": 30}).defaultTime;
    }

    //TODO: notify reset timer, for now we readd entry
    var blockedSites = await getCurrentApps();
    let entry = blockedSites.get(name)
    let newEntry : AppInfo = entry !== undefined? 
        {...entry, remainingTime: time, expired: false} 
        :
        {name, favIconUrl: tab.favIconUrl!, remainingTime: time, expired: false}; 
    addApp(newEntry);
    setAppAsActive(name);
}

export const deactivateApp = async () => {
    let activeApp : ActiveAppInfo = await getStorage(Storage.ActiveSite);
    global.clearInterval(activeApp.sessionId!)
    let session = activeApp.currentSession;
    let timedelta = session.lastRecordedTime - Date.now()

    let deactivatedApp : AppInfo = {
        ...activeApp,
        remainingTime: activeApp.remainingTime - timedelta
    }
    console.log(deactivatedApp)
    addApp(deactivatedApp)
}

const addApp = async (app: AppInfo) => {
    let currentApps = await getCurrentApps();
    
    currentApps.set(app.name, app)

    await setStorage(Storage.BlockedSites, currentApps);
}