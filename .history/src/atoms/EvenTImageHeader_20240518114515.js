import React from 'react'
import "./HeaderGlass.css";


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
        ICon
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