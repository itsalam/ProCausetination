import { extractHostname, resolveChomeCallback } from "../helpers";
import { Storage, WebAppListing } from "../types";
import Tab = chrome.tabs.Tab;

export const getCurrentApps = async () : Promise<Map<string, Tab>> => {
    let blockedSite = await resolveChomeCallback([Storage.BlockedSite], chrome.storage.sync.get, chrome.storage.sync);
    console.log(blockedSite);
    const entries: any = blockedSite[Storage.BlockedSite];
    return new Map<string, Tab>(Object.keys(entries).length? entries : []);
}

export const setCurrentApps = async (tab: Tab, blockedSites: Map<string, Tab>) : Promise<void> => {
    var name = extractHostname(tab?.url!);
    if(!name){
        console.log("Invalid domain found. Alert the user with a toast!")
        return;
    }
    blockedSites.set(name, tab);
    console.log(blockedSites);
    console.log("help");
    
    await resolveChomeCallback({[Storage.BlockedSite]: Array.from(blockedSites.entries())}, chrome.storage.sync.set, chrome.storage.sync);
}