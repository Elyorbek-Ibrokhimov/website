import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

const initialState = {
  currencyFilter: CurrencyFilters.SHOW_ALL_CURRENCIES
}

const spreadState = { 
  spreadInfo: []
}

function mainApp (state = initialState, action) {
  switch (action.type) {
    case 'HIDE_ALL_CURRENCIES':
      console.log('hiding all currencies');
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
      console.log('SETTING THE SPREAD TIMER');
      return {
        ...state,
        interval: action.interval
      }
    case 'GET_SPREAD': 
      console.log('REDUCER HIT, GETTING NEW SPREAD');
      return state;
      
    default: 
      return state
  }
}

const test = (state={}, action) => {
  console.log('ACTION TYPE ', action);
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