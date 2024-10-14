import React from "react";
import "./HeaderGlass.css";

function HeaderGlass() {


  const openLink2 = () => {
    window.open('https://moxie5agency.com/contact-us', '_blank');
  };


  const openLink = () => {
    window.open('https://moxie5agency.com/', '_blank');
  };


  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
          <div className="host glassy">Moxie 5 Agency</div>
        </dvi>
        <div className="event-details">
          {/* <p>hello is it me you're looking for</p> */}
          <h2 className="new-event-name">Welcome To Sk!p</h2>
          <p className="new-event-desc">
          Welcome to Moxie5 Events, Your Dynamic Partner For Corporate Events in Kampala, Uganda Through Innovative Solutions  That Transcend Traditional Boundaries.{" "}
          </p>
          <div className="btn-layer">
<button onClick={openLink} className="read-more">Crea</button>
<button onClick={openLink2} className="rsvp">Contact Us</button>

          </div>
        </div>
      </div>
    </dvi>
  );
}

export default HeaderGlass;
