var express = require('express');
var app = express();
var OANDAAdapter = require('oanda-adapter');
var instruments = express.Router();
var request = require('request');


var client = new OANDAAdapter({
    // 'live', 'practice' or 'sandbox' 
    environment: 'sandbox',   
    accessToken: '785859a1090608580772ae60f4ba9190-35e71ab4cadbc9787e3d6b2844e7dac1',
    username: 'jordac2'
});

//Sends instrument list for DOM 
instruments.get('/', function(req, res){
  var instruments = "http://api-sandbox.oanda.com/v1/instruments";
  request(instruments, function(error, response, body) {
    if (error) {
      console.log('error getting instruments')
    } else if (!error && response.statusCode === 200){
      res.send(body);
    };
  });
});

//Generates price on request 
/* 1) Get the response for price and send it to client/Save the E-tag property value
   2) Make another request while using the previous E-tag value and changing the header
   3) If nothing has been changed, the server will respond with 304, otherwise it will be 200 */
instruments.get('/price', function(req, res) {
  var prices = "http://api-sandbox.oanda.com/v1/prices?instruments=EUR_USD%2CUSD_JPY";
  request(prices , function (error, response, body) {
    if (error) {
      console.log('error getting prices')
    } else if (!error && response.statusCode === 200) {
      res.send(response);
    };
  });
});

module.exports = instruments

