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
  

  let div = document.createElement('div');
  div.className = 'popup-result';
  div.style.width = 'auto';
  div.style.height = 'auto';
  div.style.padding = '10px';

  div.style.border = 'solid';
  div.style.borderColor = 'rgba(164, 66, 0, 0.6)';
  div.style.borderWidth = '2px';
  div.style.backgroundColor = 'rgba(255, 173, 5, 0.6)';
  div.style.color = 'rgba(105, 20, 14, 0.9)';
  div.style.fontSize = '40px';
  div.style.fontFamily = 'monospace';

  div.style.position = 'fixed';
  div.style.top = '30px';
  div.style.left = '50%';
  div.textContent = result;

  let body = document.querySelector('body');
  body.appendChild(div)

  setTimeout(function(){
    div.remove();
  }, 5000)

  console.log(result);
}






