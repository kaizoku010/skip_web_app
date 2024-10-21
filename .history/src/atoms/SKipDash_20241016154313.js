import React, { useContext } from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from  "reactjs-bottom-navigation";
function SKipDash() {
  const { user, events, logout } = useContext(AuthContext);
  return (
    <div className="facebook-dashboard">
      {/* Header */}
      <div className="dash_header">
        <DashHeader user={user} />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <UserDetailsBar user={user} />
        </div>
        <div className="main-content">
          {/* Stories */}
          <UserContent user={user} events={events} />
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <CurrentEvent events={events} user={user}/>
        </div>
      </div>

    </div>
  );
}

export default SKipDash;
