//Displays the main data table that will show bid spread for major instruments
//Will also display asking and Bid prices
//This will require the fetchPrices function.
//Once the page loads, run fetchPrices for major currencies and display on the table.
//Add E-tag and AJAX to fetch for changing data. 
  //AJAX will continually ping your server, if there is a change in the headtag then 

(function instruemnts () {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var responseObject = xhr.responseText;
    var instrumentList = JSON.parse(responseObject);
    console.log(instrumentList);
  }
  xhr.open('GET', '/instruments');
  xhr.send();
}());


(function fetchPrices () {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var responseObject = xhr.responseText;
    var priceList = JSON.parse(responseObject);
    var priceBox = document.getElementById('price-box');
    console.log(priceList);
  };

    xhr.open('POST', '/instruments/prices');
    xhr.send('EUR_USD');
  
}());