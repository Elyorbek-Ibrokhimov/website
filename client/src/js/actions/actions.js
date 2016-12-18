/**
 * Action Types
 */

export const CurrencyFilters = {
  SHOW_ALL_CURRENCIES: 'SHOW_ALL_CURRENCIES',
  HIDE_ALL_CURRENCIES: 'HIDE_ALL_CURRENCIES' 
}

export function hideAllCurrencies () {
  return {
    type: 'HIDE_ALL_CURRENCIES'
  }
}

export const setSpreadTimer = (interval) => {
  return {
    type: 'SET_SPREAD_TIMER',
    interval
  }
}

export const getSpreadInfo = (currencyList) => {
  return {
    type: 'GET_SPREAD',
    currencyList
  }
}

export function test (newNumber) {
  return {
    type: 'TEST_ACTION',
  }
}
