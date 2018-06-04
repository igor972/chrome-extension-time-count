document.getElementById('select-session').addEventListener('click', selectClicked);

function selectClicked() {
  chrome.tabs.query({active: true, currentWindow: true}, getTabs);
}

function getTabs(tabs) {
  let tab = tabs[0];
  chrome.tabs.sendMessage(tab.id, 'select')
}