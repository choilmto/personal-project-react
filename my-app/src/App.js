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

const mapFork = (structure, element) => ({
  ...structure,
  id: element.id,
  repo: element.repo.name,
  baseURL: element.repo.url,
  timestamp: new Date(element.created_at)
})

const mapPR = (structure, element) => ({
  ...structure,
  id: element.id,
  title: element.payload.pull_request.title,
  link: element.payload.pull_request.html_url,
  status: element.payload.action,
  timestamp: new Date(element.created_at)
})

//export
const destructureEvents = (eventArr, mapCallback, type, structure) =>
  eventArr
  .filter((element) => element.type === type)
  .map(mapCallback.bind(null, structure))
  .sort((a, b) => a.timestamp - b.timestamp)
  .map((element) => ({...element, timestamp: element.timestamp.toString()}))

//export
//must never be empty
const eventFilter = [
  {
    radioLabel: "Pull Requests",
    githubEventName:"PullRequestEvent",
    caption: "Recent Pull Requests",
    mapCallback: mapPR,
    dataStructure: PRStructure
  },
  {
    radioLabel: "Forks",
    githubEventName: "ForkEvent",
    caption: "Recent Forks",
    mapCallback: mapFork,
    dataStructure: forkStructure
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ""
    };
  }

  componentDidMount() {
    //fetch
    this.setState({...eventFilter.reduce((accumulator, currentVal) =>
      ({
      ...accumulator,
      [currentVal.githubEventName]: {
        ...currentVal,
        data: destructureEvents(githubEvents, currentVal.mapCallback, currentVal.githubEventName, currentVal.dataStructure)
      }
    }), {})});
    //separate state setting for decoupling
    try {
      this.setState({val: eventFilter[0].githubEventName});
    } catch (err) {
      //for troubleshooting
      console.error("eventFilter is an empty array.", err);
    }
  }

  unselect = (name) => {
    this.setState({val: name});
  }

  render() {
    let temp = this.state[this.state.val];
    return (
      <div>
        {eventFilter.map((element) =>
          [<input type="radio"
            checked={this.state.val === element.githubEventName}
            onChange={this.unselect.bind(this, element.githubEventName)}>
          </input>,
          <label>{element.radioLabel}</label>
        ])}

        {this.state.val ? <EventList
          eventListInfo={temp.data}
          caption={temp.caption}
          structure={temp.dataStructure} /> :
        "Waiting for information from Github"}
      </div>
    );
  }
}

/**/

export default App;
