import React from "react";
import "./HeaderGlass.css";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

function HeaderGlass() {


  const openLink2 = () => {
    window.open('https://moxie5agency.com/', '_blank');
  };


  const openLink = () => {
    window.open('https://moxie5agency.com/', '_blank');
  };


  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
sdsds <img className="header_ic" src={}/>
          <Link style={{textDecoration:"none !important"}} to="/login" >
          <div className="host glassy"> 
            <SlUser className="user_ic"/>
            <Link to="/login" className="login-text">Login</Link>
            </div>
          </Link>
          
        </dvi>
        <div className="event-details">
          {/* <p>hello is it me you're looking for</p> */}
          <h2 className="new-event-name">Welcome To Sk!p</h2>
          <p className="new-event-desc">
          Welcome to sk!p Events, Your Dynamic Partner For Corporate Events in Kampala, Uganda Through Innovative Solutions  That Transcend Traditional Boundaries.{" "}
          </p>
          <div className="btn-layer">
<button onClick={openLink} className="read-more">About Sk!p</button>
<button onClick={openLink2} className="rsvp">More On Moxie5</button>

          </div>
        </div>
      </div>
    </dvi>
  );
}

export default HeaderGlass;
