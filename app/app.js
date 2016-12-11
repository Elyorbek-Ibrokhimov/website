var express = require('express');
var app = express();
var router = express.Router();
var instruments = require('./routes/instruments.js');
var currencies = require('./models/currency.js');

app.use(express.static('../client/public'));
app.use('/instruments', instruments);

app.get('/', function(req,res) {
  res.sendFile( __dirname + '/client/public/index.html');
});

app.get('/currencies', function (req, res) {
  res.send(JSON.stringify(currencies));
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('ForExpress app running on ' + port);