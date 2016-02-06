var express = require('express');
var app = express();
var instruments = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var parseText = bodyParser.text();

instruments.post('/prices', parseText, function(req, res) { 
  var bearer = '7c976fabc657d1e43ed9f9bb41e89384-3ed6e173de731a96ecc5399ba5a2377d';
  var query = req.body
  var prices = 'https://api-fxpractice.oanda.com/v1/prices?instruments=' + query;
  request(prices, {
    'auth': {
      'bearer': bearer
      }
    }, function (error, response, body) {
    if (error) {
      console.log(error)
    } else if (!error && response.statusCode === 200) {
      res.send(response);            
    };
  });
});

instruments.post('/history', parseText, function(req, res){
  var instrument = req.body;
  var count = 180;
  var url = 'https://api-fxpractice.oanda.com/v1/candles?' 
    + 'instrument='+ instrument + '&' 
    + 'count=' + count +'&' 
    + 'candleFormat=bidask&' 
    + 'granularity=D&' 
    + 'dailyAlignment=0&' 
    + 'alignmentTimezone=America%2FNew_York'
  request(url, {'auth': {'bearer': '7c976fabc657d1e43ed9f9bb41e89384-3ed6e173de731a96ecc5399ba5a2377d'}}, function(error, response, body){
    (error) ? console.log(error) : res.send(body)
  })
})

module.exports = instruments
