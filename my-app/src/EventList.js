import React from "react";
import { eventFilter } from './AppProps';

const EventList = ({ eventListInfo, selection}) =>
{
  let settings = eventFilter.find(element => element.githubEventName === selection);
  return (
    <div>
      <h2>{settings.title}</h2>
      {(eventListInfo.length === 0) ?
        <div>No {settings.title}</div> :
        <ul>
          {eventListInfo.map(element => <li>{settings.format(element)}</li>)}
        </ul>
      }
    </div>
  );
}

export default EventList;
