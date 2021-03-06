'use strict';

import {applyMiddleware} from 'redux';
import store from '../lib/store.js';
import * as actionCreators from '../actions/actions.js'
const Promise = require("bluebird");

const spreadMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SET_SPREAD_TIMER': 
      gatherInstruments.then((result) => {
        let formattedList = formatCurrencyList(result);
        store.dispatch(actionCreators.getSpreadInfo(result, formattedList));
        // action.interval = setInterval(() => {
        //   store.dispatch(actionCreators.getCurrencySpreads());
        // }, 2000)
        store.dispatch(actionCreators.getCurrencySpreads());
        next(action);      
      })
    break;

    case 'GET_CURRENCY_SPREADS':
      let currencyNames = store.getState().spread.queryString;
      updateSpreadPrices(currencyNames).then((result) => {
        action.updatedSpread = makeSpread(result);
        next(action)
      });     
    break;

    default:
      next(action)
  }
};

/**
 * @promise Fetches spread prices for a currency list
 */
const updateSpreadPrices = (instrument) => {
  return new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/instruments/prices');
    xhr.send(instrument);  

    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.log('error')
      }
      else if (xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);
        var data = JSON.parse(responseObject.body).prices; 
        resolve(data);     
      };
    }
  });
};

/**
 * @promise Retrieves all currencies that need to be listed
 */
const gatherInstruments = new Promise ((resolve, reject) => {
  const xhr = new XMLHttpRequest;
  // xhr.addEventListener('error', reject);
  xhr.onload = function () {
    var currencyList = JSON.parse(xhr.responseText);
    var allInstruments = currencyList[0].instrument
    var instrumentString = (function () {       
      for (var i=1; i<currencyList.length; i++){           
        allInstruments += '%2C' + currencyList[i].instrument;      
        };     
      }());
      resolve(currencyList);
    }  
  xhr.open('GET', 'api/currencies', true);
  xhr.send(null);    
})
 
/**
 * Formats any list of currencies to Ooanda price fetching requreiments
 * @param {list} - The list of all the currency pairs
 */
const formatCurrencyList = (list) => {
  // Start string with first currency pair and then add on
  let newList = list[0].instrument;
  for (var i=1; i < list.length; i++){           
    newList += '%2C' + list[i].instrument;      
  };
  return newList;
}

/**
 * Calculates spread for all the currency pairs
 * @param {list} - The list of all the currency pairs
 */
const makeSpread = (list) => {
  return list.map((currency, i, array) => {
    let calculation = Math.pow(10,4)*(currency.ask - currency.bid);
    currency.spread = Math.round(calculation*100)/100;
    return currency;
  })
}

// const middleware = applyMiddleware(spreadMiddleware);

// export default middleware;

export default spreadMiddleware;