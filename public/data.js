


// Fetches prices for given instrument.

var fetchData = function (instrument) {
  // console.log(currencyData) 
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var responseObject = JSON.parse(xhr.responseText);
    var data = (JSON.parse(responseObject.body)).prices;
    dataProperties(data, 'ask');

  }
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);
};

//Gathers all the insturment names to put in the url
function gatherInstruments () {
  var xhr = new XMLHttpRequest;
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    // console.log(responseObject);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
      };     
    }());
    // console.log(allInstruments);
    fetchData(allInstruments);
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();  
};

gatherInstruments();

function dataProperties (data, property) {
  for (var x=0; x<data.length; x++) {
    // var propertyList = data[i].property;
    
    console.log(data[x][property]);
  }
}


















