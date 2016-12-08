var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var instruments = require('./routes/instruments.js');
var Currencies = require('./models/currency.js');

// mongoose.connect('mongodb://localhost/currencies');

app.use(express.static('../client/public'));
// app.use(express.static('app/dist/vendor'));
app.use('/instruments', instruments);

app.get('/', function(req,res) {
  res.sendFile( __dirname + '/client/public/index.html');
});

app.get('/currencies', function (req, res) {
  Currencies.find({}).exec(function (err, currencies){
    res.send(JSON.stringify(currencies));
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('ForExpress app running on ' + port);