import React, { useContext } from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "reactjs-bottom-navigation";
import { BellFilled, AppstoreFilled, WechatOutlined } from "@ant-design/icons";

function SKipDash() {
  const { user, events, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // hook for navigation

  const bottomNavItems = [
    {
      title: "Home",
      onClick: () => navigate("/dash"), // Navigate to Home
      icon: <BellFilled />,
      activeIcon: <BellFilled color="#fff" />
    },
    {
      title: "User Details",
      onClick: () => navigate("/ud"), // Navigate to User Details
      icon: <AppstoreFilled />,
      activeIcon: <AppstoreFilled color="#fff" />
    },
    {
      title: "Current Event",
      onClick: () => navigate("/dash"), // Navigate to Current Event
      icon: <BellFilled />,
      activeIcon: <BellFilled color="#fff" />
    },
    {
      title: "Chat",
      onClick: () => navigate("/chat"), // Navigate to Chat
      icon: <WechatOutlined />,
      activeIcon: <WechatOutlined color="#fff" />
    }
  ];

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
          <CurrentEvent events={events} user={user} />
        </div>
      </div>

      {/* Bottom Navigation - Only show on mobile */}
      <div className="bottom-navigation-area mobile-only"> 
    <
      </div>
    </div>
  );
}

export default SKipDash;
