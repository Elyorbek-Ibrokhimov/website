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

function fetchPrices () {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var responseObject= JSON.parse(xhr.responseText);
    var priceList = JSON.parse(responseObject.body)
    var priceBox = document.getElementById('price-box');
    var value1 = document.getElementById('value1');
    // var eTag = responseObject.headers
    value1.textContent = priceList.prices[0].ask;
    console.log(priceList)
  };
    xhr.open('POST', '/instruments/prices');
    xhr.send('EUR_USD');
  
};

fetchPrices()

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