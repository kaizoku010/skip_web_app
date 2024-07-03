import React, { useState, useEffect } from "react";
import "./EventHolder.css";
import TestImg from "../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlCalender } from "react-icons/sl";
import { IoBookmarkOutline } from "react-icons/io5";

function EventHolder({ imageLink, eventName, date, desc }) {
  const [loading, setLoading] = useState(true); // State to manage loading

  // Simulating data loading with useEffect
  useEffect(() => {
    // Simulate loading delay (e.g., fetching data from API)
    setTimeout(() => {
      setLoading(false); // Set loading to false after some delay (simulating data loaded)
    }, 2000); // Change delay time as per your requirement
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="event-holder glassy">
      {loading ? ( // Show spinner while loading is true
        <div className="spinner-container">
please wait...
        </div>
      ) : (
        <div className="event-content-holder">
          <img className="event-image" src={imageLink} alt="Event" />
          <h4 className="counterHeading title">{eventName}</h4>
          <p className="event-desc-new newtext">{desc.substring(0, 260)}</p>
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
      )}
    </div>
  );
}

export default EventHolder;
