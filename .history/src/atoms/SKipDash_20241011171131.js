import React, { useContext } from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
import { useNavigate } from "react-router-dom";

function SKipDash() {
  const { user, events, logout } = useContext(AuthContext);

  console.log("current_user:", user)
  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link>About Moxie 5 Marketing Agency</Link>
      <Link>Introducing Sk!p</Link>
    </div>
  );
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
          <CurrentEvent events={events} user={user}/>
        </div>
      </div>
    </div>
  );
}

export default SKipDash;
