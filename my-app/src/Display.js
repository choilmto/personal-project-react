import React from 'react';
import EventList from './EventList';
import { Selection } from './Selection';

const Display = ({ username, selection, setSelection, events }) =>
  {

    return (
      <div>
        <h1>{`${username}'s Github account`}</h1>
        <Selection selection={selection}
          setSelection={setSelection}/>

        {events[selection] ?
          <EventList selection={selection}
            events={events}/>:
          <div>Waiting for information from Github</div>
        }
      </div>
    );
  }


export { Display };
