import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';

const App = ({username, selection, setSelection, events, handleClick, error, handleButton}) =>
 (
    <div>
      {username ?
        <Display username={username}
          selection={selection}
          setSelection={setSelection}
          events={events}
          handleClick={handleClick}
        /> :
        <Login error={error}
          handleButton={handleButton}/>
      }
    </div>
  )

export default App;
