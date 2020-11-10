chrome.runtime.onInstalled.addListener(function (object) {
    try {
      // On install, open a welcome tab.
      if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        // TODO: Create welcome page
        const postInstallURL = ''978
        chrome.tabs.create({ url: postInstallURL })
      }
    } catch (e) {
      console.error(e)
    }
  })