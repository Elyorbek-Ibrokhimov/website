var express = require('express');
    mongoose = require('mongoose');
    app = express();
    currencies = express.Router();

var currenciesSchema = new mongoose.Schema({
  instrument: String,
  displayName: String
})

var Currencies = mongoose.model('Currency', currenciesSchema);

module.exports = Currencies;