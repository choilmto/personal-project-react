import React from "react";

const EventListItem = ({ eventInfo, structure }) =>
  (
    <tr>
      {
        Object.keys(structure).map((element, index) =>
          {
            switch(index) {
            case 0:
              return <th scope="row">{eventInfo[element]}</th>;
            default:
              return <td>{eventInfo[element]}</td>
            }
          }
        )
      }
    </tr>
  )

export default EventListItem;
