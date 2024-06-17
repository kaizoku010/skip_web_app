import React from "react";
import "./EventHolder.css";
import TestImg from "../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlCalender } from "react-icons/sl";
import { IoBookmarkOutline } from "react-icons/io5";

// /const element = <FontAwesomeIcon icon="fa-solid fa-house" />

function EventHolder({imageLink, eventName}) {
  console.log("first: ")
  return (
    <div className="event-holder glassy">
      <div className="event-content-holder">
        <img className="event-image" src={imageLink} />
        <h4 className="heaven counterHeading">{eventName}</h4>
        <p className="event-desc-new newtext">
          The operating system is what makes an Apple product an Apple product.
          When you’re on the team that forms the core of that personality, you
          help ensure it’s inseparable from the device’s identity as a whole.
        </p>
        <div className="events-date-element">

          <div className="icon-work">
          <SlCalender className="ic" />
<div className="date-only">
     <p className="ev-date-title">Date</p>
            <p className="ev-date-number">17/05/2024</p>
</div>
           
          </div>
          <IoBookmarkOutline className="ic" />

        </div>
      </div>
    </div>
  );
}

export default EventHolder;
