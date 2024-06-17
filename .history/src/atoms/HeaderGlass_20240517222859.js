import React from "react";
import "./HeaderGlass.css";
import videoSrc from "../assets/kla.mp4"; // Make sure the path is correct

function HeaderGlass() {
  return (
    <div className="header_">
      <div className="video-container">
        <video className="video-bg" src={videoSrc} autoPlay loop muted></video>
      </div>
      <div className="glass">
        <div className="host-here">
          <div className="host glassy">Moxie 5 Agency</div>
        </div>
        <div className="event-details">
          <h2 className="new-event-name">Event Name</h2>
          <p className="new-event-desc">
            Award‑winning movies. Binge‑worthy shows. Your favorite music
            mastered in Spatial Audio. The most epic collection of mobile games.
            And the world’s largest library of 4K Ultra HD fitness content.
          </p>
          <div className="btn-layer">
            <button className="read-more">Read More</button>
            <button className="rsvp">Bookings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderGlass;
