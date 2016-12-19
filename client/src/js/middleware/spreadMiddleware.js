'use strict';

import {applyMiddleware} from 'redux';
import store from '../lib/store.js';
import * as actionCreators from '../actions/actions.js'
const Promise = require("bluebird");

const spreadMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SET_SPREAD_TIMER': 
      gatherInstruments.then((result) => {
      
      resolve(currencyList);
        store.dispatch(actionCreators.getSpreadInfo(result));
        store.dispatch(actionCreators.getSpreadInfo())
        // action.interval = setInterval(() => {
        //   store.dispatch(actionCreators.setCurrencySpreads());
        // }, 2000)
        store.dispatch(actionCreators.setCurrencySpreads());
        next(action);      
      })
    break;

    case 'GET_CURRENCY_SPREADS':
      let currencyNames = store.getState().spread.currencyList;
      postData(currencyNames);
      next(action)
    break;

    case 'FORMAT_CURRENCY_LIST': 
    
    break;

    default:
      next(action)
  }
};

/**
 * Fetches spread prices for a currency list
 * TODO: refactor to redux
 */
function postData (instrument, dataJSON) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/instruments/prices');
  xhr.send(instrument);  

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log('error')
    }
    else if (xhr.status === 200) {
      var responseObject = JSON.parse(xhr.responseText);
      console.log('RESPONSE OBJECT');
      var data = (JSON.parse(responseObject.body)).prices; 
      var instrumentNames = dataJSON;
      var askPrices = dataProperties(data, 'ask'); 
      var bidPrices = dataProperties(data, 'bid');
      var spread = makeSpread();
      function makeSpread () {
        var spreadArray =[];
        function spreadRound (calculation) {
          spreadArray.push(Math.round(calculation*100)/100)
        };
        function spreadCalculation () {
          return Math.pow(10,4)*(askPrices[i] - bidPrices[i])
        };
        for (var i=0; i<instrumentNames.length; i++) {
          var calculation = spreadCalculation()        
          spreadRound(calculation);
        };
        return spreadArray;
      };          
      var cellTable = React.createElement(dataCells, {
        nameList: instrumentNames,
        askList: askPrices,
        bidList: bidPrices,
        spreadList: spread
      });
      ReactDOM.render(cellTable, document.getElementById('data-table'));      
    };
  };
};

/**
 * Retrieves all currencies that need to be listed
 */
const gatherInstruments = new Promise ((resolve, reject) => {
  const xhr = new XMLHttpRequest;
  // xhr.addEventListener('error', reject);
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    var allInstruments = currencyList[0].instrument
    }  
  xhr.open('GET', '/currencies', true);
  xhr.send(null);    
})
 
/**
 * Formats any list of currencies to Ooanda price fetching requreiments
 * @param {list} - The list of all the currency pairs
 */
const formatCurrencyList = (list) => {
  let newList = list[0].instrument;
  for (var i=1; i < list.length; i++){           
    newList += '%2C' + list[i].instrument;      
  };
  return newList;
}

const middleware = applyMiddleware(spreadMiddleware);

export default middleware;
