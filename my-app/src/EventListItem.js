import React from "react";

const EventListItem = ({ eventInfo }) =>
  (
    <tr>
      {
        Object.values(eventInfo).map((element, index) =>
          {
            switch(index) {
            case 0:
              return <th scope="row">{element}</th>;
            default:
              return <td>{element}</td>
            }
          }
        )
      }
    </tr>
  )

export default EventListItem;
