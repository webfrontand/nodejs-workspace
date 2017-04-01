import React from 'react';

import { App } from '../containers';
import { Auth, Myroom } from '../components';

import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Auth} />
    <Route path="auth" component={Auth} />
    <Route path="myroom" component={Myroom} />
  </Route>
)
