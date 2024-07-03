import React, { useState, useEffect } from "react";
import "./EventHolder.css";
import TestImg from "../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlCalender } from "react-icons/sl";
import { IoBookmarkOutline } from "react-icons/io5";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function EventHolder({ imageLink, eventName, date, desc }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200); // Update progress every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="event-holder glassy">
      {loading ? (
        <div className="progress-container">
          <ProgressBar now={progress} label={`${progress}%`} />
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
