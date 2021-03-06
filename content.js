chrome.runtime.onMessage.addListener(getMessage);

let before_div_style = {
  background_color: ''
}

function getMessage(message, sender, sendResponse) {
  if(message === 'highlight') {
    let highlighted = window.getSelection().toString();
    let times = filterTimeFromText(highlighted)
    highlitedPrint(sumTimes(times));
  }

  if(message === 'select') {
    let elem = document.querySelector('body');

    elem.addEventListener('mouseover', addColorBackground);
    elem.addEventListener('mouseout', returnNormalBackground);
    elem.addEventListener('mouseover', showResult);
    elem.addEventListener('click', removeDivResult);
  }
}

function createDivResult(){
    let div = document.createElement('div');
    div.style.zIndex = '99999';
    div.id = 'popup-result';
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
    return div;
}

function addColorBackground(e){
  // if the div dont exists, create!
  let printExist = document.querySelector('#popup-result');
  if(!printExist) {
    let div = createDivResult();

    let body = document.querySelector('body');
    body.appendChild(div)
  }

  before_div_style.background_color = e.target.style.backgroundColor;
  e.target.style.backgroundColor = 'rgba(155, 205, 0, 0.7)';
}

function returnNormalBackground(e) {
  e.target.style.backgroundColor = before_div_style.background_color;
}

function removeDivResult(e) {
  let div = document.querySelector('#popup-result');
  div.remove();
  e.currentTarget.removeEventListener('mouseover', addColorBackground);
  e.currentTarget.removeEventListener('mouseout', returnNormalBackground);
  e.currentTarget.removeEventListener('mouseover', showResult);
  e.currentTarget.removeEventListener('click', removeDivResult);
  returnNormalBackground(e);
}

function showResult(e) {
  let text = e.target.innerText;
  let times = filterTimeFromText(text)

  printResult(sumTimes(times));
}

function printResult(result) {
  let div = document.querySelector('#popup-result');
  div.textContent = result;
}

function highlitedPrint(result) {
  let printExist = document.querySelector('#popup-result');
  if(!printExist) {
    let div = createDivResult();
    div.textContent = result;
    setTimeout(()=>{
      div.remove();
    }, 3000);

    let body = document.querySelector('body');
    body.appendChild(div);
  }
}






