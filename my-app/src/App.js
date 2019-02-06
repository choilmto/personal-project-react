import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      username: "",
      usernameMessage: ""
    };
  }

  componentDidMount() {
    try {
      this.setState({val: this.props.eventFilter[0].githubEventName});
    } catch (err) {
      console.error("eventFilter is an empty array.", err);
    }
  }

  getUsername = (username) => {
    fetch(`https://api.github.com/users/${username}/events`)
      .then((response) => (response.status === 200) ?
        response.json() : Promise.reject(`Status: ${response.status}`)
      ).then((githubJSON) => {
        this.setState({
          username: username,
          ...this.props.eventFilter.reduce((accumulator, currentVal) =>
          ({
          ...accumulator,
          [currentVal.githubEventName]: {
            ...currentVal,
            data: this.props.destructureEvents(githubJSON, currentVal.mapCallback,
              currentVal.githubEventName, currentVal.dataStructure)
          }
        }), {})});
      }).catch((error) => {
        console.error("Fetch error.", error);
        this.setState({usernameMessage: "Check username"});
      });
  }

  unselect = (name) => {
    this.setState({val: name});
  }

  render() {
    let state = this.state;
    return (
      <div>
        {state.username ?
          <Display username={state.username}
            eventFilter={this.props.eventFilter}
            unselect={this.unselect}
            val={state.val}
            eventVal={state[state.val]}
          /> :
          <Login getUsername={this.getUsername}
            usernameMessage={state.usernameMessage}/>
        }
      </div>
    );
  }
}

export default App;
