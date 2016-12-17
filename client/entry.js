import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './src/js/lib/store.js'
import App from './src/js/components/app.js'
import { hideAllCurrencies } from './src/js/actions/actions.js'

// import { cells } from './src/js/data.js';
import test from './src/js/components/test.js';

render(<App store={store} />, document.getElementById('root'));

require('./index.html');
require('bootstrap-loader');
require('./src/scss/default.scss');
require('./src/assets/images/_index.js');

