chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
  if(message === 'clicked') {
    let selected = window.getSelection().toString();
    let regexp = /([0-9]{1,2}:[0-9]{2})/g

    let times = getMatches(selected, regexp)

    console.log(sumTimes(times));
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
    arr[index].split(':').forEach((item, idx) => {
      let converted = Number(item);
      time_in_seconds += (idx == 0 ? converted * 60 : converted)
    })
  }

  return secondsToTime(time_in_seconds)
}

function secondsToTime(seconds) {
  let hrs = 0;
  let mnt = 0;
  let scs = 0;

  // get hours
  hrs = Math.floor(seconds / 3600)
  seconds = seconds % 3600

  // get minutes
  mnt = Math.floor(seconds / 60)

  // get seconds
  scs = seconds % 60

  return `${hrs}:${mnt <= 9 ? '0' + mnt : mnt}:${scs}`
}