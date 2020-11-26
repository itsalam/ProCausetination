import Tab = chrome.tabs.Tab;

export enum Storage { 
    BlockedSites = 'BLOCKED_SITES',
    AccountInfo = 'ACCOUNT_INFO',
    ActiveSite = "ActiveSite"
} 

export enum Time {
    MINUTE = 60 * 1000,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24
}

export interface WebAppListing {
    name: string,
    icon: string,
}

export interface AccountInfo {
    defaultTime: number
}

export interface AppInfo {
    name: string,
    url?: string, 
    type?: string,
    favIconUrl: string,
    remainingTime: number,
    expired: boolean,
}

export interface ActiveAppInfo extends AppInfo{
    currentSession: Session
    sessionId: NodeJS.Timeout
}

export interface Session {
    appName: string,
    lastRecordedTime: number,
    remainingTime: number
}