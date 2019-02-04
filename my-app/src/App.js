import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './EventList.js'
//static info
import { githubEvents } from './hw-events.js';
import { pullRequest } from './hw-pull.js';

const forkStructure = {
  id: "",
  repo: "",
  baseURL: "",
  timestamp: ""
}

const PRStructure = {
  id: "",
  title: "",
  link: "",
  status: "",
  timestamp: ""
}

const mapFork = (element) => ({
  ...forkStructure,
  id: element.id,
  repo: element.repo.name,
  baseURL: element.repo.url,
  timestamp: element.created_at
})

const mapPR = (element) => ({
  ...PRStructure,
  id: element.id,
  title: element.payload.pull_request.title,
  link: element.payload.pull_request.html_url,
  status: element.payload.action,
  timestamp: element.created_at
})

//PullRequestEvent or ForkEvent
const destructureEvents = (eventArr, mapCallback, type) =>
  eventArr
  .filter((element) => element.type === type)
  .map(mapCallback)
  .sort((a, b) => Date(a.timestamp) - Date(b.timestamp));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioChoiceOnFork: false,
      pullRequests: [],
      forks: []
    };
  }

  componentDidMount() {
    //fetch
    this.setState({
      pullRequests: destructureEvents(githubEvents, mapPR, "PullRequestEvent"),
      forks: destructureEvents(githubEvents, mapFork, "ForkEvent")
    });
  }

  unselect = () => {
    this.setState({radioChoiceOnFork: !this.state.radioChoiceOnFork});
  }

  render() {
    /*return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );*/
    return (
      <div>
        <input type="radio"
        checked={!this.state.radioChoiceOnFork}
        onChange={this.unselect}>
        </input>
        <label>Pull request</label>
        <input type="radio"
        checked={this.state.radioChoiceOnFork}
        onChange={this.unselect}>
        </input>
        <label>Fork</label>

        {this.state.radioChoiceOnFork ?
          <EventList eventListInfo={this.state.forks} caption={"Recent Forks"} structure={forkStructure} /> :
          <EventList eventListInfo={this.state.pullRequests} caption={"Recent Pull Requests"} structure={PRStructure} />}
      </div>
    );
  }
}

export default App;
