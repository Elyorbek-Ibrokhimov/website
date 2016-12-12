import { combineReducers } from 'redux';
import { CurrencyFilters } from '../actions/actions.js';

const initialState = {
  currencyFilter: CurrencyFilters.SHOW_ALL_CURRENCIES
}

function mainApp (state = initialState, action) {
  console.log('STATE INITIALIZED', state);

  if (action.type === 'HIDE_ALL_CURRENCIES') {
    console.log('hiding all currencies');
    return Object.assign({}, currencyFilter, {
      currencyFilter: action.filter
    })
  }
  return state;
}

const forexApp = combineReducers({
  mainApp
})

export default forexApp;