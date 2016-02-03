var express = require('express');
var mongoose = require('mongoose');
var app = express();
var currencies = express.Router();

var currenciesSchema = new mongoose.Schema({
  instrument: String,
  displayName: String
});

var Currencies = mongoose.model('Currency', currenciesSchema);

module.exports = Currencies;