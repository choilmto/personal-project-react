import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';
import { reduceCallback, destructureEvents } from './AppProps';

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

  handleFetchError = (response, msg) => {
    if (!response.ok) {
      this.setState({usernameMessage: msg});
      throw Error(response.statusText);
    }
  }

  convertStringToFetch = (url) =>
    fetch(url)
    .then(response => {
      this.handleFetchError(response, "Check username");
      return response.json();})
    .catch(error => console.error("Fetch error.", error))

  setUsername = username => {
    //returns a promise with an array of values
    Promise.all([
      `https://api.github.com/users/${username}/events`,
      `https://api.github.com/users/${username}/repos?`
    ].map(element => this.convertStringToFetch(element)))
    .then(responseArr => {
    //destructure events endpoint for each event
      let events = this.props.eventFilter.reduce(reduceCallback.bind(
        null, responseArr[0], destructureEvents), {ForkEvent: null, PullRequestEvent: null});

      //destructure repos endpoint for each event
      if(events.ForkEvent.data.length === 0) {
        events.ForkEvent.data = responseArr[1].filter(element => element.fork)
          .map((element) => element.name);
      }

      //fetch all pull requests listed and mutate events object
      Promise.all(events.PullRequestEvent.data.map(element => this.convertStringToFetch(element)))
      .then(response => {
        events.PullRequestEvent.data.forEach((element, index) =>
          element.status = response[index].state);
        this.setState({
          username: username,
          ...events
        });
      });
    });
  }

  unselect = name => {
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
          <Login setUsername={this.setUsername}
            usernameMessage={state.usernameMessage}/>
        }
      </div>
    );
  }
}

export default App;
