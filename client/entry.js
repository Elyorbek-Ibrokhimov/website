'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './src/js/lib/store.js'
import MainApp from './src/js/components/app.js'

require('./src/assets/images/_index.js');
require('./index.html');
require('bootstrap-loader');
require('./src/scss/default.scss');

render(<MainApp store={store} />, document.getElementById('root'));


