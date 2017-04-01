import React from 'react';
import { App } from './components';
import {render} from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk, promiseMiddleware()));

console.log(store.getState());
store.subscribe(() => { console.log(store.getState()) })


render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.getElementById('app')
);
