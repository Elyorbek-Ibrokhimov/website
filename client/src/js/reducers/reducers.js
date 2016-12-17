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
    case 'GET_SPREAD': 
      console.log('REDUCER HIT, GETTING NEW SPREAD');
    case 'SET_SPREAD_TIMER':
      console.log('SETTING THE SPREAD TIMER');
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