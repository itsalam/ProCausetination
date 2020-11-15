import { Storage, WebAppListing } from "../../types";
import Tab = chrome.tabs.Tab;

export const getCurrentApps = async () : Promise<Tab[]> => {
    let listApps: Tab[] = [];
    var dataFetch = new Promise<Tab[]>((resolve, reject) => {
        chrome.storage.sync.get([Storage.BlockedSite], result => {
            console.log(result)
            resolve(result[Storage.BlockedSite]);
        });
    })
    listApps = await dataFetch;
    console.log(listApps);
    return listApps;
}