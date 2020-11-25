// import { AccountInfo } from './../types';

// export function getAuthToken() : Promise<string>{
//     return new Promise((resolve)=> {
//         chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//             resolve(token);
//         })
//     });
// }

// export function getAccountInfo() : Promise<AccountInfo>{
//     return new Promise((resolve) => {
//         resolve({"defaultTime": 30});
//     })
// }

// export function setAccountInfo(args: { [key:string]: any}) : Promise<void> {
//     var accountInfo = getStorage(Storage.AccountInfo);
//     return setStorage(Storage.AccountInfo, JSON.stringify(blockedSites, replacer));
// }