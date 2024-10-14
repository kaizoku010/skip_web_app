import React from "react";
import "./HeaderGlass.css";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import Logo from "../assets/ll2.gif"
import { Button, ConfigProvider, Flex, Popover, Segmented } from 'antd';

function HeaderGlass() {


  const content = (
    <div>
      <p>About Moxie 5 Marketing Agency</p>
      <p>Introducing Sk!p</p>
    </div>
  );

  const openLink2 = () => {
    window.open('/register');
  };


  const openLink = () => {
    window.open('/login');
  };


  return (
    <dvi className="header_">
      <div className="glass">
        <dvi className="host-here">
 <img className="header_ic" src={Logo}/>
          <Link style={{textDecoration:"none !important"}} to="/login" >
          <div className="host glassy"> 
            <SlMenu className="user_ic"/>
            <Link to="/login" className="login-text">Menu</Link>
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
