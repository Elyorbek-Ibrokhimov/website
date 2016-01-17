var express = require('express');
    app = express();
    router = express.Router();
    mongoose = require('mongoose');
    instruments = require('./instruments.js');
    path = require('path');
    Currencies = require('./models/currency.js');

mongoose.connect('mongodb://localhost/currencies');

app.use(express.static('public'));
app.use(express.static('vendor'));
app.use('/instruments', instruments);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/currencies', function (req, res) {
  Currencies.find({}).exec(function (err, currencies){
    res.send(JSON.stringify(currencies));
  });
})

app.listen(3000);
console.log('ForEx server is up on 3000');