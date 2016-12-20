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
 * @param {queryString} - String of insturments Oanda needs to return prices 
 */
export const getSpreadInfo = (currencyList, queryString) => {
  return {
    type: 'GET_CURRENCIES',
    currencyList,
    queryString
  }
}

/**
 * Sets the pricing info for currencies
 */
export const getCurrencySpreads = (updatedSpread) => {
  return {
    type: 'GET_CURRENCY_SPREADS',
    updatedSpread
  }
}

export function test (newNumber) {
  return {
    type: 'TEST_ACTION',
  }
}
