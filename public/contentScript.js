/* global chrome */

chrome.runtime.connect({
  name: "content-script"
});

window.addEventListener("message", function(event) {
  chrome.runtime.sendMessage(event.data);
});
