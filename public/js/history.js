//-------------History Graph Section-------------//

// Gets initial chart setting with days since last year as a filter
function getHistory () {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/instruments/history')
  xhr.send();
  xhr.onload = function() {
    responseObject = JSON.parse(xhr.responseText);
    dateList = responseObject.candles
    console.log(dateList);
  }
}

// getHistory();



