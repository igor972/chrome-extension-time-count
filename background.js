chrome.browserAction.onClicked.addListener(clicked);

function clicked(tab) {
  console.log(tab)
  chrome.tabs.sendMessage(tab.id, 'clicked')
}