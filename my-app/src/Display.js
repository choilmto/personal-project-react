import React from 'react';
import EventList from './EventList';
import { Selection } from './Selection';

const Display = ({ username, eventVal }) =>
  (
    <div>
      <h1>{`${username}'s Github account`}</h1>
      <ConnectedSelection />

      {this.props.events[this.props.selection] ?
        <EventList /> :
        <div>Waiting for information from Github</div>
      }
    </div>
  );

export { Display };
