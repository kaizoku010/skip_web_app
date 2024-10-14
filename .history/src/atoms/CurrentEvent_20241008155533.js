import React from "react";
import "./current_event.css";
import Nice from "../assets/nice.png"

function CurrentEvent() {
  let event = 1;

  if (event === 0) {
    return (
      <div className="user_current_event">
        <div className="no_event_found">🥺 No Event Data found....</div>
      </div>
    );
  }
  return (
    <div className="user_current_event2">
        <p></p>
      <div className="event_found">
        <img className="event_image"  src={Nice}/>
        <h4 className="active_event_title">UHI Event</h4>
        <p className="aet_location noMargins">Organizer: Mubende</p>
        <p className="aet_location noMargins">Time & Date: 22:00PM 12/33/2024</p>
        <p className="aet_location noMargins">Location: Mubende</p>
        <p className="aet_location noMargins">Price: 300</p>

      </div>
    </div>
  );
}

export default CurrentEvent;
