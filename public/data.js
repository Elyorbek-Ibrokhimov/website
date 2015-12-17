


// Fetches prices for given instrument.

var postData = function (instrument, dataJSON) {
  // console.log(currencyData) 
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var responseObject = JSON.parse(xhr.responseText);
    var data = (JSON.parse(responseObject.body)).prices; //Array of instrument objects
    var displayNames = dataProperties(dataJSON, 'displayName') 
    var askPrices = dataProperties(data, 'ask'); // Array of ask prices
    var bidPrices = dataProperties(data, 'bid');

    console.log(displayNames);

  }
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);
};

//Gathers all the insturment names to put in the url
function gatherInstruments () {
  var xhr = new XMLHttpRequest;
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    // console.log(currencyList);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
      };     
    }());
    // console.log(allInstruments);
    postData(allInstruments, currencyList);
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();  
};

gatherInstruments();

function dataProperties (data, property) {
  var list = [];
  for (var x=0; x<data.length; x++) {    
    list.push((data[x][property]));
  }
  return list;
}


















