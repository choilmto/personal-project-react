import React from 'react';
import EventList from './EventList';
import { Selection } from './Selection';

const Display = ({ username, eventFilter, unselect, val, eventVal }) =>
  (
    <div>
      <h1>{`${username}'s Github account`}</h1>
      <Selection eventFilter={eventFilter}
        unselect={unselect}
        val={val}
      />

      {eventVal ?
        <EventList
          eventListInfo={eventVal.data}
          title={eventVal.title}
          format={eventVal.format}/>:
        <div>Waiting for information from Github</div>
      }
    </div>
  );

export { Display };
