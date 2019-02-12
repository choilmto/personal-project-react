import React from "react";
import { eventFilter } from './AppProps';

const EventList = ({ selection, events }) =>
  {
    let settings = eventFilter.find(element => element.githubEventName === selection);
    let eventListInfo = events[selection];
    return (
      <div>
        <h2>{settings.title}</h2>
        {(eventListInfo === 0) ?
          <div>No {settings.title}</div> :
          <ul>
            {eventListInfo.map(element => <li>{settings.format(element)}</li>)}
          </ul>
        }
      </div>
    );
  }

export default EventList;
