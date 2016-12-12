import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import forexApp from './src/js/reducers/reducers.js'
import App from './src/js/components/app.js'

var store = createStore(forexApp);


render(App, document.getElementById('root'));

require('./index.html');
require('bootstrap-loader');
require('./src/scss/default.scss');
require('./src/js/index.js');
require('./src/assets/images/_index.js');

