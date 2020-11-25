import { resolveChromeCallback } from "helpers";
import Tab = chrome.tabs.Tab

export async function getStorage(key: string){
    let storage = await resolveChromeCallback([key], chrome.storage.sync.get, chrome.storage.sync)
    return JSON.parse(storage[key], reviver)
}

export async function setStorage(key: string, object:any){
    object = JSON.stringify(object, replacer)
    return await resolveChromeCallback({[key]: object}, chrome.storage.sync.set, chrome.storage.sync)
}

function replacer(this: any, key: string | number, value: any) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()) as unknown as Object, // or with spread: value: [...originalObject]
        };
    } else {
        return value;
    }
}

function reviver(key: any, value: { dataType: string; value: Iterable<readonly [unknown, unknown]>; } | null) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}