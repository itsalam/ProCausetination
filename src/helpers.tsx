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

export async function resolveChomeCallback<T>(args: any, callbackFn: (params: any, fn: (args0?: T) => void) => void, object?: any): Promise<T> {
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

export function replacer(this: any, key: string | number, value: any) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()) as unknown as Tab, // or with spread: value: [...originalObject]
        };
    } else {
        return value;
    }
}

export function reviver(key: any, value: { dataType: string; value: Iterable<readonly [unknown, unknown]>; } | null) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}