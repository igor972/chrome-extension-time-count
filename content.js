chrome.runtime.onMessage.addListener(getMessage);

let before_div_style = {
  background_color: ''
}

function getMessage(message, sender, sendResponse) {
  console.log(message)
  if(message === 'highlight') {
    let highlighted = window.getSelection().toString();
    let times = filterTimeFromText(highlighted)
    printResult(sumTimes(times));
  }

  if(message === 'select') {
    let elem = document.querySelector('body');

    elem.addEventListener('mouseover', addColorBackground)

    elem.addEventListener('mouseout', returnNormalBackground)

    elem.addEventListener('click', showResult);
  }
}

function addColorBackground(e){
  before_div_style.background_color = e.target.style.backgroundColor;
  e.target.style.backgroundColor = 'rgba(155, 205, 0, 0.7)';
}

function returnNormalBackground(e) {
  e.target.style.backgroundColor = before_div_style.background_color;
}

function showResult(e) {
  let text = e.target.innerText;
  let times = filterTimeFromText(text)

  printResult(sumTimes(times));

  removeEvents(e);
}

function removeEvents(elem) {
  elem.currentTarget.removeEventListener('mouseover', addColorBackground);
  elem.currentTarget.removeEventListener('mouseout', returnNormalBackground);
  elem.currentTarget.removeEventListener('click', showResult);
  returnNormalBackground(elem);
}

function printResult(result) {
  console.log(result);
}