import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { rootReducer, logout } from './RootReducer';
import { setSelection } from './SelectionReducerAndActions';
import { fetchDataThunk, fetchUsernameThunk } from './Thunks';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

let currentUsername;
const setData = () => {
  let previousUsername = currentUsername;
  currentUsername = store.getState().user.username;

  if ((currentUsername !== "") && (previousUsername !== currentUsername)) {
    store.dispatch(fetchDataThunk(currentUsername));
  }
};

store.subscribe(setData);

const mapStateToProps = (state) => ({
  username: state.user.username,
  error: state.user.error,
  selection: state.display.selection,
  events: state.data.events
})

const mapDispatchToProps = (dispatch) => ({
  handleButton: (username) => dispatch(fetchUsernameThunk(username)),
  setSelection: (selection) => dispatch(setSelection(selection)),
  handleClick: () => dispatch(logout())
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
