'use strict';

/**
 * Action to filter out all currencies
 */
export function hideCurrencies (name) {
  return {
    type: 'HIDE_CURRENCIES',
    name
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
