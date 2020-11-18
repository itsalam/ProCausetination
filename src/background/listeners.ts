import { getCurrentApps, setCurrentApps } from '../services/currentApps';
import { extractHostname, replacer, resolveChomeCallback } from "../helpers";
import { Storage } from "../types";
import Tab = chrome.tabs.Tab;

export function addTabListener() {
    chrome.tabs.onActivated.addListener(async function(activeInfo) {
        var tab: Tab = await resolveChomeCallback<Tab>(activeInfo.tabId, chrome.tabs.get);
        var blockedSites = await resolveChomeCallback([Storage.BlockedSite], chrome.storage.sync.get, chrome.storage.sync) 

    });
}

export function addInstallListener() {
    chrome.runtime.onInstalled.addListener(async function (object) {
        chrome.contextMenus.create(
        {
            id: "add_site",
            title: "Add site to AppBlock",
            checked: false,
        })
        await resolveChomeCallback({[Storage.BlockedSite]: JSON.stringify(new Map<string, Tab>(), replacer)}, chrome.storage.sync.set, chrome.storage.sync) ;
        console.log("built storage for blocked sites");
        if (object.reason === 'install') {
        // TODO: Create welcome page
        }
    
    })
}

export function addContextMenuListener(){
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === 'add_site'){
            var blockedApps: Map<string, Tab> = await getCurrentApps();
            if(tab){
                await setCurrentApps(tab, blockedApps)
            }
            console.log(await getCurrentApps());
        }
    });         
}

