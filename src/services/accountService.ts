

export function getAuthToken() : Promise<string>{
    return new Promise((resolve, reject)=> {
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            resolve(token);
        })
    });
}