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
          <p>hello is it me you're looking for</p>
          <h2>Event Name</h2>
          <p className="new-event-desc">
            Award‑winning movies. Binge‑worthy shows. Your favorite music
            mastered in Spatial Audio. The most epic collection of mobile games.
            And the world’s largest library of 4K Ultra HD fitness content.{" "}
          </p>
          <div className="btn-layer">
<button className="read-more">REad More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderGlass;
