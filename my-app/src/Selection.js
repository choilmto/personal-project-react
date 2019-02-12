import React from 'react';
import { eventFilter } from './AppProps';

const Selection = ({ selection, unselect }) =>
  (
    <div>
      {eventFilter.map((element) =>
        [<input type="radio"
          checked={selection=== element.githubEventName}
          onChange={() => unselect(element.githubEventName)}>
        </input>,
        <label>{element.radioLabel}</label>
      ])}
    </div>
  )

export { Selection };
