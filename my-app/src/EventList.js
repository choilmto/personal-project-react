import React from "react";

const EventList = ({ eventListInfo, title, format }) =>
  (
    <div>
      <h2>{title}</h2>
      {(eventListInfo.length === 0) ?
        <div>No {title}</div> :
        eventListInfo.map(element => <div>{format(element)}</div>)
      }
    </div>
  );

export default EventList;
