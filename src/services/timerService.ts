import { AppInfo, Session } from 'types';
import { setActiveAppFields } from './appService';
import { setStorage } from './storageService';

export function createSession(appInfo: AppInfo) : Session{
    return ({ 
        appName : appInfo.name,
        remainingTime: appInfo.remainingTime,
        lastRecordedTime: Date.now()}
        )
}

export function startSession(session: Session, interval = 60) : NodeJS.Timeout {
    //Update/write to storage every minute, until last minute, then write every second 
    let intervalId = global.setInterval(() => {
        let currenttime = Date.now()
        let timeDelta = currenttime - session.lastRecordedTime
        if (timeDelta > interval * 1000){
            session.lastRecordedTime = currenttime
            session.remainingTime -= timeDelta
            if (0 > session.remainingTime){
                console.log("time up")
                setActiveAppFields({currentSession: session, expired: true})
            }
            else setActiveAppFields({currentSession: session})
        }
    }, 1000)

    return intervalId
}

