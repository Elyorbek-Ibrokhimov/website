var express = require('express');
var app = express();
var OANDAAdapter = require('oanda-adapter');
var instruments = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var parseText = bodyParser.text();
var currencies = require('./public/json/currencies.json');

// console.log(currencies)
var client = new OANDAAdapter({
    // 'live', 'practice' or 'sandbox' 
    environment: 'sandbox',   
    accessToken: '785859a1090608580772ae60f4ba9190-35e71ab4cadbc9787e3d6b2844e7dac1',
    username: 'jordac2'
});

// (function calculateCells () {
  
// }());

// Sends instrument list for data.js 
instruments.get('/', function(req, res){
  res.send(currencies);
});

//Generates price on request 
/* 1) Get the response for price and send it to client/Save the E-tag property value
   2) Make another request while using the previous E-tag value and changing the header
   3) If nothing has been changed, the server will respond with 304, otherwise it will be 200 */

instruments.post('/prices', parseText, function(req, res) {
  var query = req.body
  var prices = 'http://api-sandbox.oanda.com/v1/prices?instruments=' + query;
  request(prices , function (error, response, body) {
    if (error) {
      console.log(error)
    } else if (!error && response.statusCode === 200) {
      res.send(response);
    };
  });
});

instruments.get('/history', function(req, res){
  var instrument = 'EUR_USD'
  var count = 10
  var url = 'https://api-sandbox.oanda.com/v1/candles?instrument='+ instrument +'&count=' + count + '&candleFormat=bidask&granularity=D&dailyAlignment=0&alignmentTimezone=America%2FNew_York'
  request(url, function(error, response, body){
    (error) ? console.log(error) : res.send(body)
  })
})

module.exports = instruments

