import React, { Component } from 'react';
import EventList from './EventList';
import { Selection } from './Selection';

class Display extends Component {
  componentDidMount () {
    this.props.setData(this.props.username);
  }

  render() {
    let props = this.props;
    return (
      <div>
        <h1>{`${props.username}'s Github account`}</h1>
        <Selection
          unselect={props.unselect}
          selection={props.selection}
        />

        {props.eventListInfo ?
          <div>
            <EventList
              eventListInfo={props.eventListInfo}
              selection={props.selection}/>
            <button onClick={props.handleClick}>Press to see another user</button>
          </div> :
          <div>Waiting for information from Github</div>
        }
      </div>
    );
  }
}

export { Display };
