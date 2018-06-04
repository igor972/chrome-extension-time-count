document.getElementById('select').addEventListener('click', clicked);
document.getElementById('highlight').addEventListener('click', clicked);

function clicked(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let tab_id = tabs[0].id
    let message = e.target.id;

    // send message to content.js file
    chrome.tabs.sendMessage(tab_id, message);
  });
}
