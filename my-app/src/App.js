import React, { Component } from 'react';
import './App.css';
import EventList from './EventList.js'
//static info
import { githubEvents } from './hw-events.js';

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

const mapFork = (structure, element) =>
  ({
    ...structure,
    id: element.id,
    repo: element.repo.name,
    baseURL: element.repo.url,
    timestamp: element.created_at
  })

const mapPR = (structure, element) =>
  ({
    ...structure,
    id: element.id,
    title: element.payload.pull_request.title,
    link: element.payload.pull_request.html_url,
    status: element.payload.action,
    timestamp: element.created_at
  })

export const destructureEvents = (eventArr, mapCallback, type, structure) =>
  eventArr
    .filter((element) => element.type === type)
    .map(mapCallback.bind(null, structure))
    .sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      } else if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;}
    )

export const eventFilter = [
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
    this.setState({...this.props.eventFilter.reduce((accumulator, currentVal) =>
      ({
      ...accumulator,
      [currentVal.githubEventName]: {
        ...currentVal,
        data: this.props.destructureEvents(githubEvents, currentVal.mapCallback, currentVal.githubEventName, currentVal.dataStructure)
      }
    }), {})});
    //separate state setting for decoupling
    try {
      this.setState({val: this.props.eventFilter[0].githubEventName});
    } catch (err) {
      //for troubleshooting
      console.error("eventFilter is an empty array.", err);
    }
  }

  unselect = (name) => {
    this.setState({val: name});
  }

  render() {
    let val = this.state.val;
    let eventVal = this.state[val];

    return (
      <div>
        {this.props.eventFilter.map((element) =>
          [<input type="radio"
            checked={val=== element.githubEventName}
            onChange={this.unselect.bind(this, element.githubEventName)}>
          </input>,
          <label>{element.radioLabel}</label>
        ])}

        {val ? <EventList
          eventListInfo={eventVal.data}
          caption={eventVal.caption}
          structure={eventVal.dataStructure} /> :
        "Waiting for information from Github"}
      </div>
    );
  }
}

/**/

export default App;
