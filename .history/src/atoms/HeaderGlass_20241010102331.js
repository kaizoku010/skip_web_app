import React from "react";
import "./HeaderGlass.css";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";
import Logo from "../assets/ll2.gif"

function HeaderGlass() {


  const openLink2 = () => {
    window.open('https://moxie5agency.com/', '_blank');
  };


  const openLink = () => {
    window.open('/register');
  };


  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
 <img className="header_ic" src={Logo}/>
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
<button onClick={openLink} className="read-more">Login</button>
<button onClick={openLink2} className="rsvp">Create Account</button>

          </div>
        </div>
      </div>
    </dvi>
  );
}

export default HeaderGlass;
