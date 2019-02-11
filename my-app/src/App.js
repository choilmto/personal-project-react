import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    let username = props.username;
    return (
      <div>
        {username ?
          <Display username={username}
            selection={props.selection}
            setSelection={props.setSelection}
            events={props.events}
          /> :
          <Login error={props.error}
            handleButton={props.handleButton}/>
        }
      </div>
    );
  }
}

export default App;
