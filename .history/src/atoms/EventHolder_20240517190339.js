import React, { useState } from "react";
import "./EventHolder.css";
import TestImg from "../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlCalender } from "react-icons/sl";
import { IoBookmarkOutline } from "react-icons/io5";

// /const element = <FontAwesomeIcon icon="fa-solid fa-house" />



function EventHolder({imageLink, eventName, date, desc}) {
  // const [evns, setEvents] = useState()
  // const toggleDescription = (eventId) => {
  //   setEvents(prevEvents =>
  //     prevEvents.map(event =>
  //       event.id === eventId ? { ...event, showFullDescription: !event.showFullDescription } : event
  //     )
  //   );
  // };

  return (
    <div className="event-holder glassy">
      <div className="event-content-holder">
        <img className="event-image" src={imageLink} />
        <h4 className="counterHeading title">{eventName}</h4>
        <p className="event-desc-new newtext">
        </p>
        <div className="events-date-element">

          <div className="icon-work">
          <SlCalender className="ic" />
<div className="date-only">
     <p className="ev-date-title">Date</p>
            <p className="ev-date-number">{date}</p>
</div>
           
          </div>
          <IoBookmarkOutline className="ic" />

        </div>
      </div>
    </div>
  );
}

export default EventHolder;
