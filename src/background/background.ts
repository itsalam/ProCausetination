import { extractHostname } from "../helpers";
import { Storage } from "../types";


chrome.runtime.onInstalled.addListener(function (object) {
  try {
    console.log(chrome)
    // On install, open a welcome tab.
    chrome.contextMenus.create(
      {
        id: "add_site",
        title: "Add site to AppBlock",
        checked: false,
      })
    chrome.storage.sync.set({[Storage.BlockedSite]: []}, ()=>{
      console.log("built storage for blocked sites");
    })
    if (object.reason === 'install') {
      // TODO: Create welcome page
      const postInstallURL = ''
      console.log('INSTALLED !')
      // chrome.tabs.create({ url: postInstallURL })
    }
  } catch (e) {
    console.error(e)
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'add_site'){
    chrome.storage.sync.get([Storage.BlockedSite], (result)=>{
      try{
        console.log(result)
        result[Storage.BlockedSite].push(tab)
        chrome.storage.sync.set(
          {
            [Storage.BlockedSite]: result[Storage.BlockedSite]
          }, 
          () => {
            console.log(result);
            chrome.pageAction.show(tab?.id!);
          }
        )

      } catch (e) {
        console.error(`No current tab active, possible issues: ${e},\n Current Storage query: ${result}`);
      }
    })
  }
})