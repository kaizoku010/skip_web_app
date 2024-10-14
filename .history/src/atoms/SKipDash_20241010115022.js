import React from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
const { user } = useContext(AuthContext);

function SKipDash() {
  return (
    <div className="facebook-dashboard">
      {/* Header */}
      <div className="dash_header">
        <DashHeader />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <UserDetailsBar />
        </div>
        <div className="main-content">
          {/* Stories */}
          <UserContent />
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <CurrentEvent />
        </div>
      </div>
    </div>
  );
}

export default SKipDash;
