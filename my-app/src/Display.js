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

      <EventList
        eventListInfo={eventVal.data}
        caption={eventVal.caption}
        structure={eventVal.dataStructure} />
    </div>
  );

export { Display };
