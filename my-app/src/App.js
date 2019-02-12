import React, { Component } from 'react';
import './App.css';
import { Display } from './Display';
import { Login } from './Login';
import { getReduceCallback, destructureEvents, token, eventFilter } from './AppProps';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "",
      username: "",
      usernameMessage: ""
    };
  }

  componentDidMount() {
    try {
      this.setState({selection: this.props.eventFilter[0].githubEventName});
    } catch (err) {
      console.error("eventFilter is an empty array.", err);
    }
  }

  convertStringToFetch = (url) =>
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
  })

  fetchEndpoints = (allEndpoints) =>
    Promise.all(allEndpoints.map(element => this.convertStringToFetch(element)))

  setUsername = username  => {
     this.convertStringToFetch(`https://api.github.com/users/${username}${token}`)
     .then(() => this.setState({username}))
     .catch((error) => {
       this.setState({usernameMessage: "Check username"});
       console.error(error);
     });
  }

  setData = username => {
    //returns a promise with an array of values
    this.fetchEndpoints([
      `https://api.github.com/users/${username}/events${token}`,
      `https://api.github.com/users/${username}/repos${token}`
    ])
    .then(responseArr => {
      console.log(responseArr);
      //destructure events endpoint for each event
      let events = eventFilter.reduce(getReduceCallback(responseArr[0]), {});
      //destructure repos endpoint for each event
      if(events.ForkEvent.length === 0) {
        events.ForkEvent = responseArr[1]
          .filter(element => element.fork)
          .map((element) => ({repo: element.name}));
      }

      //fetch all pull requests listed and mutate events object
      this.fetchEndpoints(events.PullRequestEvent
        .map(element => element.JSONUrl))
      .then(response => {
        events.PullRequestEvent = events.PullRequestEvent.map((element, index) => ({
          ...element,
          status : response[index].state
        }));
        this.setState({...events});})
      .catch((error) => console.error(error));
    });
  }

  unselect = name => {
    this.setState({selection: name});
  }

  render() {
    let state = this.state;
    let username = state.username;
    return (
      <div>
        {username ?
          <Display username={username}
            setData={this.setData}
            unselect={this.unselect}
            selection={state.selection}
            eventListInfo={state[state.selection]}
          /> :
          <Login setUsername={this.setUsername}
            usernameMessage={state.usernameMessage}/>
        }
      </div>
    );
  }
}

export default App;
