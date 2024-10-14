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
      <div className="event_found">
        <img className="event_image"  src={Nice}/>
        <h4>UHI Event</h4>
      </div>
    </div>
  );
}

export default CurrentEvent;
