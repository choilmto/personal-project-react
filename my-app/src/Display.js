import React from 'react';
import EventList from './EventList';
import { Selection } from './Selection';

const Display = ({ username, selection, setSelection, events, handleClick }) =>
  {

    return (
      <div>
        <h1>{`${username}'s Github account`}</h1>
        <Selection selection={selection}
          setSelection={setSelection}/>

        {events[selection] ?
          <div>
            <EventList selection={selection}
              events={events}/>
            <button onClick={handleClick}>Press to see another user</button>
          </div> :
          <div>Waiting for information from Github</div>
        }
      </div>
    );
  }


export { Display };
