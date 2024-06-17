import React from 'react'
import "./HeaderGlass.css";
import IconBox from "./IconBox.js"
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";

function EvenTImageHeader({date, price, location, image, status}) {

// console.log("first:",location)

  return (
    <div className="header_">
    <div className="glass">
      <dvi className="host-here">
        <div className="host glassy">Event Location Details</div>
      </dvi>
      <div className="event-details">
        {/* <p>hello is it me you're looking for</p> */}
        {/* <h2 className="new-event-name">Event Name</h2> */}
        hello icons
        <IconBox name="location" icon/>
        <p className="new-event-desc">
          Award‑winning movies. Binge‑worthy shows. Your favorite music
          mastered in Spatial Audio. The most epic collection of mobile games.
          And the world’s largest library of 4K Ultra HD fitness content.{" "}
        </p>
        <div className="btn-layer">
<button className="read-more">Read More</button>
<button className="rsvp">Bookings</button>

        </div>
      </div>
    </div>
  </div>  )
}

export default EvenTImageHeader