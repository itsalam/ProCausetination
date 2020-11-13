chrome.runtime.onInstalled.addListener(function (object) {
    try {

      chrome.contextMenus.create({
        id: "addPage",
        title: "Add this site to the extension"
      })      
      // On install, open a welcome tab.
      if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        // TODO: Create welcome page
        const postInstallURL = ''
        console.log('INSTALLED !')
        // chrome.tabs.create({ url: postInstallURL })
      }
    } catch (e) {
      console.error(e)
    }
  })

chrome.contextMenus.onClicked.addListener( (info, tab) => {
  if (info.menuItemId === "addPage"){
    console.log(info, tab)
    chrome.storage.sync.get(['tabs'], (tabs) => {
      chrome.storage.sync.set({tabs: {...tabs, tab} })
    })
  }
})
// Create context menu to add a website

