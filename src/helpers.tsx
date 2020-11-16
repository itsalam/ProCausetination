import psl from 'psl';

export function extractHostname(url:string): string {
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

export async function resolveChomeCallback<T>(args: any, callbackFn: (params: any, fn: (args0?: T) => void ) => void, object?: any): Promise<T>{
    return await new Promise<any>((resolve, reject) => {
        if (object) {
            callbackFn.call(object, args, (result: any) => 
            {
                resolve(result);
            });
        } else {
            callbackFn(args, (result) => {
                resolve(result);
            })
        }
    });
}