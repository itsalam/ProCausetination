import { extractHostname } from "../helpers";
import { addContextMenuListener, addInstallListener, addTabListener } from "./listeners";



function startTimer(time: number = Date.now()) : NodeJS.Timeout {
    let intervalId = global.setInterval(() => {
        time = Date.now()
    }, 1000)

    return intervalId
}

addInstallListener();
addTabListener();
addContextMenuListener();


// setInterval(function(){ alert("Hello"); }, 3000);