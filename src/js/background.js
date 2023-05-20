// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.openExtension) {
//       chrome.browserAction.openPopup();
//     }
//   });

  window.addEventListener("message", function(event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source != window)
      return;
  
    if (event.data.type && (event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {        
      chrome.runtime.sendMessage(event.data); // broadcasts it to rest of extension, or could just broadcast event.data.payload...
    } // else ignore messages seemingly not sent to yourself
  }, false);window.addEventListener("message", function(event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source != window)
      return;
  
    if (event.data.type && (event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT")) {        
      chrome.runtime.sendMessage(event.data); // broadcasts it to rest of extension, or could just broadcast event.data.payload...
      chrome.browserAction.openPopup();
    } // else ignore messages seemingly not sent to yourself
  }, false);