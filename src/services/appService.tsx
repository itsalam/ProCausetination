import { extractHostname } from "../helpers";
import { AppInfo, Storage, WebAppListing } from "../types";
import { getStorage, setStorage } from "./storageService";
import Tab = chrome.tabs.Tab;

export const getCurrentApps = async () : Promise<Map<string, AppInfo>> => {
    return await getStorage(Storage.BlockedSites);
}

export const setActiveApp = async (tab: Tab) : Promise<boolean> => {
    var blockedSites = await getCurrentApps();
    var tabName = extractHostname(tab?.url!);
    if (blockedSites.has((tabName))){
        blockedSites.set(tabName, 
            {...blockedSites.get(tabName), 
                startTime: Date.now(),
                isActive: true
            }
        );
        
        await setStorage(Storage.BlockedSites, blockedSites);
        await setStorage(Storage.ActiveSite, tabName);
        return true;
    }
    return false;
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

    blockedSites.set(name, {...entry, 'currentTime': time, 'favIconUrl': tab.favIconUrl});
    await setStorage(Storage.BlockedSites, blockedSites);
}