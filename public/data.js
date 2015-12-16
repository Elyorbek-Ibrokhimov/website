//Displays the main data table that will show bid spread for major instruments
//Will also display asking and Bid prices
//This will require the fetchPrices function.
//Once the page loads, run fetchPrices for major currencies and display on the table.
//Add E-tag and AJAX to fetch for changing data. 
  //AJAX will continually ping your server, if there is a change in the headtag then 

// (function instruemnts () {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function () {
//     var responseObject = xhr.responseText;
//     var instrumentList = JSON.parse(responseObject);
//     // console.log(instrumentList);
//   }
//   xhr.open('GET', '/instruments');
//   xhr.send();
// }());

//Fetches prices for given instrument. Also grabs E-tag.

var fetchPrices = function (currencyData) {
  // console.log(currencyData)
  for (var i=0; i<currencyData.length; i++) {
    // console.log('fetching');    
    var priceBox = document.getElementById('price-box');
    var value1 = document.getElementById('value1');
    // var eTag = responseObject.headers
    // console.log(currencyData[i].instrument);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var responseObject = JSON.parse(xhr.responseText);
      var bidPrice = JSON.parse(responseObject.body);
      console.log(bidPrice.prices[0].ask)
    }
    xhr.open('POST', '/instruments/prices');
    xhr.send(currencyData[i].instrument)
  };
};

var currencies = [];


function makeList () {
  var xhr = new XMLHttpRequest;
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    // console.log(responseObject);
    for (var i=0; i<currencyList.length; i++){           
      currencies.push(currencyList[i]);
    };
    fetchPrices(currencies);
  };

  xhr.open('GET', '/instruments', true);
  xhr.send();

  
};

makeList();

// console.log(currencies);










// (function fetchPrices () {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function () {
//     var responseObject = xhr.responseText;
//     var priceList = JSON.parse(responseObject);
//     var priceBox = document.getElementById('price-box');
//     console.log(priceList.prices);

//     var value2 = document.getElementById('value2');
//     value2.textContent = priceList.prices[0].bid;
//   };
//     xhr.open('POST', '/instruments/prices');
//     xhr.send('AUD_CAD');
  
// }());