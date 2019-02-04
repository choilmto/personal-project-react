import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ eventListInfo, caption, structure }) =>
  (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {Object.keys(structure).map(element => <th scope="col">{element[0].toUpperCase() + element.slice(1)}</th>)}
        </tr>
      </thead>
      <tbody>
        {eventListInfo.map(element => <EventListItem eventInfo={element}/>)}
      </tbody>
    </table>
  )


export default EventList;
