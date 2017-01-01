'use strict';

import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

/**
 * Initial state for all the currency filters
 */
const FILTER_STATE = {
  eur: true,
  usd: true,
  gbp: true,
  chf: true,
  aud: true,
  cad: true,
  nzd: true
}


function mainApp (state = {}, action) {
  switch (action.type) {  
  default:
    return state;
  }   
}

const spread = (state={}, action) => {
  
  switch (action.type) {
    case 'SET_SPREAD_TIMER':
      return {
        ...state,
        interval: action.interval
      }
    case 'GET_CURRENCIES': 
      return {
        ...state,
        currencyList: action.currencyList,
        queryString: action.queryString
      };
    case 'GET_CURRENCY_SPREADS': 
      return {
        ...state,
        updatedSpread: action.updatedSpread
      };
      
    default: 
      return state
  }
}

const filters = (state=FILTER_STATE, action) => {
  switch (action.type) {
  
  case 'HIDE_CURRENCIES':
  console.log('HERES THE CURRENCY ', action);
    return {
      ...state,
      [action.currency]: false
    }

  default: 
    return state
  } 
}

const test = (state={}, action) => {
  switch(action.type) {
    case 'TEST_ACTION': 
      console.log('TEST');
      return state;
  
  default:
    return state
  }
}

const forexApp = combineReducers({
  mainApp,
  spread,
  filters,
  test
})

export default forexApp;