'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import forexApp from '../reducers/reducers.js'
import spreadMiddleware from '../middleware/spreadMiddleware.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(forexApp, composeEnhancers(
  applyMiddleware(spreadMiddleware)
))

export default store;