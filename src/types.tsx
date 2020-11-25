import Tab = chrome.tabs.Tab;

export enum Storage { 
    BlockedSites = 'BLOCKED_SITES',
    AccountInfo = 'ACCOUNT_INFO',
    ActiveSite = "ActiveSite"
} 

export interface WebAppListing {
    name: string,
    icon: string,
}

export interface AccountInfo {
    defaultTime: number
}

export interface AppInfo {
    name?: string,
    url?: string, 
    type?: string,
    currentTime?: number,
    favIconUrl?: string,
    startTime?: number,
    isActive?: boolean
}