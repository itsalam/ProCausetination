import { Storage } from './../types';
import { getCurrentApps, addBlockedApp, setActiveApp } from '../Services/appService';
import { extractHostname } from "../helpers";
import { getStorage, setStorage } from 'Services/storageService';
import Tab = chrome.tabs.Tab;

export function addTabListener() {
    
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
        //deactivated old tab if it's an listed app 
        var oldActive = await getStorage(Storage.ActiveSite)
        if (oldActive) {
            console.log(oldActive);
            let currentApps = await getCurrentApps();
            if (currentApps.has(oldActive)){
                console.log(currentApps.get(oldActive));
                setStorage(Storage.ActiveSite, undefined);
            }
        }

        //Find if current site is on blocked list, and start active
        chrome.tabs.get(activeInfo.tabId, async (tab) => {
            const activeFound : boolean = await setActiveApp(tab)
            console.log(activeFound)
        })
        
    })
}

export function addInstallListener() {
    chrome.runtime.onInstalled.addListener(async function (object) {
        chrome.contextMenus.create(
        {
            id: "add_site",
            title: "Add site to AppBlock",
            checked: false,
        })
        await setStorage(Storage.ActiveSite, undefined)
        await setStorage(Storage.BlockedSites, new Map<string, Tab>())
        console.log("built storage for blocked sites");
        if (object.reason === 'install') {
        // TODO: Create welcome page
        }
    
    })
}

export function addContextMenuListener(){
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === 'add_site'){
            if(tab){
                await addBlockedApp(tab)
            }
        }
    });         
}


