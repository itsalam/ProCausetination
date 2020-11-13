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
      chrome.storage.sync.set({'blocked_sites': {}}, ()=>{
        console.log("built storage for blocked sites");
      })
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

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'add_site'){
      chrome.storage.sync.get(['blocked_sites'], (result)=>{
        chrome.storage.sync.set(
          {
            blocked_sites: {...Object.values(result.blocked_sites), tab}
          }, 
          () => {console.log("we did it bois");
        })
        console.log(`oh fuck look at this`, result);
      })
    }
  })