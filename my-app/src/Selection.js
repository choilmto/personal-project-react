import React from 'react';
import { eventFilter } from './AppProps';

const Selection = ({ selection, setSelection }) =>
  (
    <div>
      {eventFilter.map((element) =>
        [<input type="radio"
          checked={selection === element.githubEventName}
          onChange={() => setSelection(element.githubEventName)}>
        </input>,
        <label>{element.radioLabel}</label>
      ])}
    </div>
  )

export { Selection };
