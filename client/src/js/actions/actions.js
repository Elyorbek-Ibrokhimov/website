'use strict';

/**
 * Action to filter out all currencies
 */
export function hideAllCurrencies () {
  return {
    type: 'HIDE_ALL_CURRENCIES'
  }
}

/**
 * Sets interval for cells to query new currency information
 * @callback {interval} - The interval function to use
 */
export const setSpreadTimer = (interval) => {
  return {
    type: 'SET_SPREAD_TIMER',
    interval
  }
}

/**
 * gets the currencies needed to display
 * @param {currencyList} - array of currencies 
 */
export const getSpreadInfo = (currencyList) => {
  return {
    type: 'GET_CURRENCIES',
    currencyList
  }
}

/**
 * Sets the pricing info for currencies
 */
export const setCurrencySpreads = () => {
  return {
    type: 'GET_CURRENCY_SPREADS'
  }
}

export function test (newNumber) {
  return {
    type: 'TEST_ACTION',
  }
}
