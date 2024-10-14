import React, { useState, useEffect } from "react";
import "./EventHolder.css";
import TestImg from "../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlCalender } from "react-icons/sl";
import { IoBookmarkOutline } from "react-icons/io5";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

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


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{backgroundImage:`url(${TestImg})`, backgroundSize:"contain"}} className="event-holder glassy">
      {/* {loading ? ( */}
        {/* <div className="progress-container">
          <Spinner animation="border" variant="primary" />
          </div>
      ) : ( */}
        <div className="event-content-holder">
          {/* <img className="event-image" src={TestImg} alt="Event" /> */}
      <div className="spacer"></div>
        <div className="new-event-details2">
              <h4 className="counterHeading new-title">{"eventName"}</h4>
          <p className="event-desc-new newtext">{"Welcome to sk!p Events, Your Dynamic Partner For Corporate Events in Kampala, Uganda Through Innovative Solutions That Transcend Traditional Boundaries."}</p>
          <div className="events-date-element2">
            <div className="icon-work">
              <SlCalender className="ic" />
              <div className="date-only">
                <p className="ev-date-title2">04/05/2009</p>
                <p className="ev-date-title3">{"date"}</p>
              </div>
            </div>
            <IoBookmarkOutline className="ic" />
          </div>
        </div>
      
        
        </div>
      {/* )} */}
    </div>
  );
}

export default EventHolder;
