var express = require('express');
var app = express();
var OANDAAdapter = require('oanda-adapter');
var router = express.Router();
var instruments = require('./instruments.js');

// console.log(client);

app.use(express.static('public'));
app.use('/instruments', instruments);


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
})



app.listen(3000);
console.log('ForEx server is up on 3000');