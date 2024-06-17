import React from "react";
import "./HeaderGlass.css";

function HeaderGlass() {
  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
          <div className="host glassy">Moxie 5 Agency</div>
        </dvi>
        <div className="event-details">
          {/* <p>hello is it me you're looking for</p> */}
          <h2 className="new-event-name">Moxie5 Events Portal</h2>
          <p className="new-event-desc">
          Welcome to Moxie5 Events, Your Dynamic Partner For Corporate Events in Kampala, Uganda Through Innovative Solutions  That Transcend Traditional Boundaries.{" "}
          </p>
          <div className="btn-layer">
<button className="read-more">About Moxie5 Marketing</button>
<button className="rsvp">Contact Us</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderGlass;
