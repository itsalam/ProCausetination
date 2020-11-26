import { extractHostname } from "../helpers";
import { addContextMenuListener, addInstallListener, addTabListener } from "./listeners";





addInstallListener();
addTabListener();
addContextMenuListener();


// setInterval(function(){ alert("Hello"); }, 3000);