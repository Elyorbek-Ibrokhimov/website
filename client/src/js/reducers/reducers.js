'use strict';

import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

// const initialState = {
//   currencyFilter: CurrencyFilters.SHOW_ALL_CURRENCIES
// }

const spreadState = { 
  spreadInfo: []
}

function mainApp (state = {}, action) {
  switch (action.type) {
    case 'HIDE_ALL_CURRENCIES':
      return {
        ...state,
        type: 'HIDE_ALL_CURRENCIES'
      }    
  default:
    return state;
  }   
}

const spread = (state=spreadState, action) => {
  
  switch (action.type) {
    case 'SET_SPREAD_TIMER':
      return {
        ...state,
        interval: action.interval
      }
    case 'GET_CURRENCIES': 
      return {
        ...state,
        currencyList: action.currencyList
      };
    case 'GET_CURRENCY_SPREADS': 
      return {
        ...state
      };
      
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
  test
})

export default forexApp;