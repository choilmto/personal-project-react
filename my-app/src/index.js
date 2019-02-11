import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { rootReducer } from './RootReducer';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import Provider, { connect } from 'react-redux';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

let currentValue;
const setData = () => {
  let previousValue = currentValue;
  currentValue = store.getState().user.username;

  if (previousValue !== currentValue) {
    store.dispatch(fetchDataThunk(currentValue));
  }
};

const unsubscribe = store.subscribe(setData);

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
