
// Fetches prices for given instrument.

var postData = function (instrument, dataJSON) {
  // console.log(currencyData) 
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);
  xhr.onload = function () {
    var responseObject = JSON.parse(xhr.responseText);
    var data = (JSON.parse(responseObject.body)).prices; //Array of instrument objects
    var instrumentNames = dataProperties(dataJSON, 'instrumentName') 
    var askPrices = dataProperties(data, 'ask'); // Array of ask prices
    var bidPrices = dataProperties(data, 'bid');
    var spread = makeSpread();

    // console.log(spread)

    function makeSpread () {
      var spreadArray =[]
      function spreadRound (calculation) {
        spreadArray.push(Math.round(calculation*1000)/1000)
      }
      function spreadCalculation () {
        return Math.pow(10,4)*(askPrices[i] - bidPrices[i])
      }
      for (var i=0; i<instrumentNames.length; i++) {
        var calculation = spreadCalculation()        
        spreadRound(calculation);
      }
      return spreadArray;
    }
    var cellNames = 
      spread.map(function(spreadData) {
        return (React.createElement(dataCells, {
          spread: spreadData, 
          key: spread.indexOf(spreadData)

          })
        
        )
        console.log('second change')
      })
    
    console.log(cellNames);
    var cellContainers = React.createElement('div', {className: 'cell-list'}, cellNames)
    ReactDOM.render(cellContainers, document.getElementById('data-table')); 
  } //onload end
};

// Gathers all the insturment names to put in the url
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
    // postData(allInstruments, currencyList);
    postData(allInstruments,currencyList)
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();  
};

gatherInstruments();

//Gets each instrument propertiey in one list per instrument
function dataProperties (data, property) {
  var list = [];
  for (var x=0; x<data.length; x++) {    
    list.push((data[x][property]));
  }
  return list;
}


// setInterval(gatherInstruments, 4000)











