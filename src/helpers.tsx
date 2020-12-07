import { time } from 'console';
import psl from 'psl';
import Tab = chrome.tabs.Tab;

export function extractHostname(url: string): string {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return psl.get(hostname) || "";
}

export async function resolveChromeCallback<T>(args: any, callbackFn: (params: any, fn: (args0?: T) => void) => void, object?: any): Promise<T> {
    return await new Promise<any>((resolve, reject) => {
        if (object) {
            callbackFn.call(object, args, (result: any) => {
                resolve(result);
            });
        } else {
            callbackFn(args, (result) => {
                resolve(result);
            })
        }
    });
}

export function chromeStorageToMap(objectStr: string): Map<string, object>{
    return new Map(JSON.parse(objectStr).value)
}

export function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
}
