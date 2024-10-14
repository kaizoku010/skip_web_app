import React, { useContext } from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
import { useNavigate } from "react-router-dom";

function SKipDash() {
  const { user } = useContext(AuthContext);

  console.log("current_user:", user)

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
          <UserContent user={user} />
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <CurrentEvent user={user}/>
        </div>
      </div>
    </div>
  );
}

export default SKipDash;
