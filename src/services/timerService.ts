import { AppInfo, Session } from 'types';
import { updateActiveApp } from './appService';
import { setStorage } from './storageService';

export function createSession(appInfo: AppInfo) : Session{
    return ({ 
        appName : appInfo.name,
        remainingTime: appInfo.remainingTime,
        lastRecordedTime: Date.now()}
        )
}

export function startSession(session: Session, interval = 60) : NodeJS.Timeout {
    let intervalId = global.setInterval(async () => {
        let currenttime = Date.now()
        let timeDelta = currenttime - session.lastRecordedTime
    
        session.lastRecordedTime = currenttime;
        session.remainingTime -= timeDelta;
        chrome.runtime.sendMessage({...session})
        if (timeDelta > interval * 1000){
            if (0 > session.remainingTime){
                console.log("time up");
                // TODO: Create notification of expired appW
                await updateActiveApp({currentSession: undefined, expired: true});
                console.log(intervalId)
                global.clearInterval(intervalId);
            }
            else {
                await updateActiveApp({currentSession: session})
            }
        }
        
    }, 1000)

    return intervalId
}

