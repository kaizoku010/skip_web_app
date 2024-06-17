import React from "react";
import "./HeaderGlass.css";

function HeaderGlass() {
  return (
    <div className="header_">
      <div className="glass">
        <dvi className="host-here">
          <div className="host glassy">Moxie 5 Agency</div>
        </dvi>
        <div className="event-details">
          {/* <p>hello is it me you're looking for</p> */}
          <h2 className="new-event-name">Moxie5 Events Portal</h2>
          <p className="new-event-desc">
          Welcome to Moxie5 Marketing Agency, Your Dynamic Partner For Comprehensive Marketing Solutions That Transcend Traditional Boundaries.{" "}
          </p>
          <div className="btn-layer">
<button className="read-more">About Moxie5</button>
<button className="rsvp">Conn</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderGlass;
