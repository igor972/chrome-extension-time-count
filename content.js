chrome.runtime.onMessage.addListener(getMessage);

let before_div_style = {
  background_color: ''
}

function getMessage(message, sender, sendResponse) {
  if(message === 'clicked') {
    let selected = window.getSelection().toString();
    let regexp = /([0-9]{1,2}:[0-9]{2})/g

    let times = getMatches(selected, regexp)

    console.log(sumTimes(times));
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

function printResult(result) {
  console.log(result);
}

function removeEvents(elem) {
  elem.currentTarget.removeEventListener('mouseover', addColorBackground);
  elem.currentTarget.removeEventListener('mouseout', returnNormalBackground);
  elem.currentTarget.removeEventListener('click', showResult);
  returnNormalBackground(elem);
}

function filterTimeFromText(text){
  let regexp = /([0-9]{1,2}:[0-9]{1,2}:[0-9]{2}|[0-9]{1,2}:[0-9]{2})/g
  return getMatches(text, regexp);
}

function getMatches(string, regex, index) {
  index || (index = 1);
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }

  return matches;
}

function sumTimes(arr) {
  let time_in_seconds = 0;
  for(index in arr) {
    let splitted = arr[index].split(':');
    splitted.forEach((item, idx) => {
      let converted = Number(item);

      if(splitted.length === 3 && idx == 0) {
        time_in_seconds += converted * 3600
      }else if(splitted.length === 3 && idx == 1 || 
               splitted.length === 2 && idx == 0) {
        time_in_seconds += converted * 60
      } else {
        time_in_seconds += converted
      }
    })
  }

  return secondsToTime(time_in_seconds)
}

function secondsToTime(seconds) {
  let hrs = mnt = scs = 0;

  // get hours
  hrs = Math.floor(seconds / 3600)
  seconds = seconds % 3600

  // get minutes
  mnt = Math.floor(seconds / 60)

  // get seconds
  scs = seconds % 60

  return `${setTwoNumberPattern(hrs)}:${setTwoNumberPattern(mnt)}:${setTwoNumberPattern(scs)}`
}

// Add two number pattern
// 1:10 => 01:10 
// 2:2:20 => 02:02:20 
function setTwoNumberPattern(number) {
  let tmp = '';
  if(number <= 9) {
    tmp = '0' + number;
  }else {
    tmp = number
  }

  return tmp
}