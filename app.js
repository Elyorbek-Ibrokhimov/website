var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var instruments = require('./server/instruments.js');
var path = require('path');
var Currencies = require('./server/models/currency.js');

mongoose.connect('mongodb://localhost/currencies');

app.use(express.static('public'));
app.use(express.static('vendor'));
app.use('/instruments', instruments);

app.get('/', function(req,res) {
  res.sendFile( __dirname + '/index.html');
});

app.get('/currencies', function (req, res) {
  Currencies.find({}).exec(function (err, currencies){
    res.send(JSON.stringify(currencies));
  });
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('ForExpress server running on ' + port);