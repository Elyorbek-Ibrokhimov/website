'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './src/js/lib/store.js'
import MainApp from './src/js/components/app.js'

render(<MainApp store={store} />, document.getElementById('root'));

require('./index.html');
require('bootstrap-loader');
require('./src/scss/default.scss');
require('./src/assets/images/_index.js');