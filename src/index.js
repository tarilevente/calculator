import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchResults} from './Store/Sagas';

import calculatorReducer from './Store/Reducers/Calculator';
import authReducer from './Store/Reducers/Auth';
import resultsReducer from './Store/Reducers/Results';


const composeEnhancers = 
  process.env.NODE_ENV==='development'
    ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    :null 
  || compose;

const rootReducer = combineReducers({
  calculator:calculatorReducer,
  auth:authReducer,
  results:resultsReducer
});

const sagaMiddleware=createSagaMiddleware();

const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchResults);


const app=(
  <Provider store={store}>
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
