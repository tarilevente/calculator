import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import calculatorReducer from './Store/Reducers/Calculator';
import authReducer from './Store/Reducers/Auth';

import thunk from 'redux-thunk';

const composeEnhancers = 
  process.env.NODE_ENV==='development'
    ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    :null 
  || compose;

const rootReducer = combineReducers({
  calculator:calculatorReducer,
  auth:authReducer
});

const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app=(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
