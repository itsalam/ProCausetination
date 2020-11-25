


export function getAuthToken() : Promise<string>{
    return new Promise((resolve, reject)=> {
        chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
            resolve(token);
        })
    });
}