import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//static info
import { githubEvents } from './hw-events.js';
import { pullRequest } from './hw-pull.js';

const destructureForkEvents = (eventArr) => eventArr.filter(
  (element) => element.type === "ForkEvent").map(
  (element) => ({
    id: element.id,
    repoName: element.repo.name,
    baseURL: element.repo.url,
    created_at: element.created_at
  })).sort((a, b) => Date(a.created_at) - Date(b.created_at));
const destructurePullRequestEvents = (eventArr) => eventArr.filter(
  (element) => element.type === "PullRequestEvent").map(
  (element) => ({
    id: element.id,
    title: element.payload.pull_request.title,
    link: element.payload.pull_request.html_url,
    status: element.payload.action,
    created_at: element.created_at
  })).sort((a, b) => Date(a.created_at) - Date(b.created_at));

console.log(destructurePullRequestEvents(githubEvents));

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
