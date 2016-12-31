var express = require('express');
var app = express();
var currencies = express.Router();
// TODO: move currencies to postgres
var list = require('./currencies.json');

module.exports = list;