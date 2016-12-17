import { createStore } from 'redux';
import forexApp from '../reducers/reducers.js'
import instrumentMiddleware from '../middleware/instrumentMiddleware.js'

var store = createStore(forexApp, instrumentMiddleware);

export default store;