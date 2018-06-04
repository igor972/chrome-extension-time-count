chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
  console.log('estou no Content.js');
  console.log(message)
  if(message === 'clicked') {
    let selected = window.getSelection().toString();
    let regexp = /([0-9]{1,2}:[0-9]{2})/g

    let times = getMatches(selected, regexp)

    console.log(sumTimes(times));
  }

  if(message === 'select') {

    let before_div_style = {
      background_color: ''
    }

    let elem = document.querySelector('body');

    elem.addEventListener('mouseover', e => {        
      before_div_style.background_color = e.target.style.backgroundColor;


      e.target.style.backgroundColor = 'rgba(155, 205, 0, 0.7)';
    })
    elem.addEventListener('mouseout', e => {
      e.target.style.backgroundColor = before_div_style.background_color;
    })
    elem.addEventListener('click', e => {
      let selected = e.target.innerText;
      let regexp = /([0-9]{1,2}:[0-9]{1,2}:[0-9]{2}|[0-9]{1,2}:[0-9]{2})/g
      let times = getMatches(selected, regexp);

      // Print the result on Console
      console.log(sumTimes(times));
    })
  }
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