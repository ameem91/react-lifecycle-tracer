
/* global chrome */

chrome.runtime.connect({
  name: "content-script"
});

window.addEventListener("message", event =>
  chrome.runtime.sendMessage(event.data)
);