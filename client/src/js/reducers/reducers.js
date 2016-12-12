import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

const initialState = {
  currencyFilter: CurrencyFilters.SHOW_ALL_CURRENCIES
}

function mainApp (state = initialState, action) {
  // console.log('STATE INITIALIZED', state);
  switch (action.type) {
    case 'HIDE_ALL_CURRENCIES':
      console.log('hiding all currencies');
      return {
        type: 'HIDE_ALL_CURRENCIES'
      }
    
  default:
    return state;
  }
    
}

const forexApp = combineReducers({
  mainApp
})

export default forexApp;