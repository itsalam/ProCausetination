import { extractHostname, replacer, resolveChomeCallback, reviver } from "../helpers";
import { Storage, WebAppListing } from "../types";
import Tab = chrome.tabs.Tab;

export const getCurrentApps = async () : Promise<Map<string, Tab>> => {
    let blockedSite = await resolveChomeCallback([Storage.BlockedSite], chrome.storage.sync.get, chrome.storage.sync);
    return JSON.parse(blockedSite[Storage.BlockedSite], reviver);
}

export const setCurrentApps = async (tab: Tab, blockedSites: Map<string, Tab>) : Promise<void> => {
    var name = extractHostname(tab?.url!);
    if(!name){
        console.log("Invalid domain found. Alert the user with a toast!")
        return;
    }
    blockedSites.set(name, tab);
    await resolveChomeCallback({[Storage.BlockedSite]: JSON.stringify(blockedSites, replacer)}, chrome.storage.sync.set, chrome.storage.sync);
}