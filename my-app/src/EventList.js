import React from "react";
import { eventFilter } from 'AppProps';

const EventList = () =>
  {
    let currentDisplay = this.props.display.selection;
    let title = eventFilter[currentDisplay].title;
    let format = eventFilter[currentDisplay].format;
    let eventListInfo = this.props.events[currentDisplay];
    return (
      <div>
        <h2>{title}</h2>
        {(eventListInfo === 0) ?
          <div>No {title}</div> :
          eventListInfo.map(element => <div>{format(element)}</div>)
        }
      </div>
    );
  }

export default EventList;
