/* global chrome */

const connections = {};

chrome.runtime.onConnect.addListener(function(port) {
  // The original connection event doesn't include the tab ID of the
  // DevTools page, so we need to send it explicitly
  const extensionListener = function(message) {
    if (message.name === "INIT") {
      connections[message.tabId] = port;
      return;
    }
  };

  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(port) {
    port.onMessage.removeListener(extensionListener);

    const tabs = Object.keys(connections);
    for (let i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]] === port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// Receive message from content script and relay to the devTools page
chrome.runtime.onMessage.addListener(function(message, sender) {
  if (sender.tab) {
    const tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(message);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
});
