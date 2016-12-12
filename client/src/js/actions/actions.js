/**
 * Action Types
 */

export const CurrencyFilters = {
  SHOW_ALL_CURRENCIES: 'SHOW_ALL_CURRENCIES',
  HIDE_ALL_CURRENCIES: 'HIDE_ALL_CURRENCIES' 
}

export function hideAllCurrencies () {
  return {
    type: HIDE_ALL_CURRENCIES
  }
}



// eurChecked: true,
//       usdChecked: true,
//       gbpChecked: true, 
//       chfChecked: true,
//       audChecked: true,
//       cadChecked: true,
//       nzdChecked: true  