var express = require('express');
var app = express();
var currencies = express.Router();
var list = require('./currencies.json');

module.exports = list;