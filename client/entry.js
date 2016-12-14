import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import forexApp from './src/js/reducers/reducers.js'
import App from './src/js/components/app.js'
import { hideAllCurrencies } from './src/js/actions/actions.js'

var store = createStore(forexApp);
console.log(store.getState());

render(<App store={store} />, document.getElementById('root'));
store.dispatch(hideAllCurrencies());

require('./index.html');
require('bootstrap-loader');
require('./src/scss/default.scss');
require('./src/js/index.js');
require('./src/assets/images/_index.js');

