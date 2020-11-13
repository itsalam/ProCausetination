import { WebAppListing } from "../types";

export const getCurrentApps = () : WebAppListing[] => {
    let listApps: WebAppListing[] = [];
    chrome.storage.sync.get("blocked", result => {
        let webApp: WebAppListing = { name:result.blocked.name, icon: result.blocked.icon}
        listApps.push(webApp);
    })
    return listApps;
}