import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';
import { eventFilter } from './AppProps';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      let props = this.props;
      <div>
        {props.username ?
          <Display username={props.username}}/> :
          <Login/>
        }
      </div>
    );
  }
}

export default App;
