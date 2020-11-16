import Tab = chrome.tabs.Tab;

export enum Storage { 
    BlockedSite = 'BLOCKED_SITES'
} 

export interface WebAppListing {
    name: string,
    icon: string,
}
