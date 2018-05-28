chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
  if(message === 'clicked') {
    let selected = window.getSelection().toString();
    console.log(selected);
  }
}