import React from 'react';

const Selection = ({ eventFilter, val, unselect }) =>
  (
    <div>
      {eventFilter.map((element) =>
        [<input type="radio"
          checked={val=== element.githubEventName}
          onChange={() => unselect(element.githubEventName)}>
        </input>,
        <label>{element.radioLabel}</label>
      ])}
    </div>
  )

export { Selection };
