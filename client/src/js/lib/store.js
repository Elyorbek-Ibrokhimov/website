'use strict';

import { createStore } from 'redux';
import forexApp from '../reducers/reducers.js'
import spreadMiddleware from '../middleware/spreadMiddleware.js'

var store = createStore(forexApp, spreadMiddleware);

export default store;