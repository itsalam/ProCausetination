import { extractHostname } from "../helpers";
import { addContextMenuListener, addInstallListener, addTabListener } from "./listeners";

addInstallListener();
addTabListener();
addContextMenuListener();
