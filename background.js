chrome.browserAction.onClicked.addListener(clicked);

function clicked(tab) {
  console.log('estou no background.js');
  chrome.tabs.sendMessage(tab.id, 'clicked')
}