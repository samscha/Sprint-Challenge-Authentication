import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reducers from './reducers';

import App from './App';
import RequireAuthentication from './components/hoc/requireAuth';
import SignIn from './components/signin';
import Jokes from './components/jokes';

import './styles/css/index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, Logger)(
  createStore,
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/jokes" component={RequireAuthentication(Jokes)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
