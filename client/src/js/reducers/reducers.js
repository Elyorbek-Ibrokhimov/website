import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

const initialState = {
  test: 0,
  currencyFilter: CurrencyFilters.SHOW_ALL_CURRENCIES
}

function mainApp (state = initialState, action) {
  // console.log('STATE INITIALIZED', state);
  switch (action.type) {
    case 'HIDE_ALL_CURRENCIES':
      console.log('hiding all currencies');
      return {
        ...state,
        type: 'HIDE_ALL_CURRENCIES'
      }
    case 'TEST_ACTION':
      return {
        ...state,
        test: action.number
      }
    
  default:
    return state;
  }
    
}

function currencyData () {
  
}

function test (state = [], action) {
  switch (true) {

  default: 
    return state
  }
  
}



const forexApp = combineReducers({
  mainApp,
  test
})

export default forexApp;