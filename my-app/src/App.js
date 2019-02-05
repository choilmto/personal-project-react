import React, { Component } from 'react';
import './App.css';
import EventList from './EventList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      username: "",
      uncheckedUsername: "",
      usernameMessage: ""
    };
  }

  componentDidMount() {
    console.log("hi");
    fetch(`https://api.github.com/users/${this.state.username}/events`)
      .then((response) => (response.status === 200) ? response.json()
        : Promise.reject(`Status: ${response.status}`))
      .then((githubJSON) => {
        this.setState({...this.props.eventFilter.reduce((accumulator, currentVal) =>
          ({
          ...accumulator,
          [currentVal.githubEventName]: {
            ...currentVal,
            data: this.props.destructureEvents(githubJSON, currentVal.mapCallback,
              currentVal.githubEventName, currentVal.dataStructure)
          }
        }), {})});
      }).then(() => {
        //separate state-setting for decoupling + because setState is async
        //leading this.state.val to have a value before
        //the data is populated in the function above
        try {
          this.setState({val: this.props.eventFilter[0].githubEventName});
        } catch (err) {
          console.error("eventFilter is an empty array.", err);
        }
      }).catch((error) => console.error("Fetch error.", error));
  }

  unselect = (name) => {
    this.setState({val: name});
  }

  handleButton = () => {
    //check username validity
    fetch(`https://api.github.com/users/${this.state.uncheckedUsername}`)
      .then((response) => (response.status === 200) ? response.json()
        : Promise.reject(`Status ${response.status}`))
      .then((response) => {
        this.setState((prevState) => ({
          username: prevState.uncheckedUsername,
          uncheckedUsername: "",
          usernameMessage: ""
        }))
      }).catch((err) => {
        console.error(err);
        this.setState({usernameMessage: "Username does not exist"})
      });
  }

  handleTyping = (e) => {
    this.setState({uncheckedUsername: e.target.value});
  }

  render() {
    let val = this.state.val;
    let eventVal = val ? this.state[val] : null;
    console.log(val);

    return (
      <div>
        {this.state.username ?
          <div>
            <h1>{`${this.state.username}'s Github account`}</h1>
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
            <div>Waiting for information from Github</div>}
          </div> :
          <div>
            <label>{this.state.usernameMessage ||
               'Please enter your Github username'}</label>
            <input type="text" onChange={this.handleTyping}/>
            <input type="button" onClick={this.handleButton} value="Submit"/>
          </div>
        }
      </div>
    );
  }
}

export default App;

//questions: curry vs bind
/*



*/
