import React from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import postImg from "../assets/cee.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input } from "antd";
import { BellFilled } from "@ant-design/icons";
import { WechatOutlined } from "@ant-design/icons";
import { AppstoreFilled } from "@ant-design/icons";
import { Collapse, Divider } from "antd";
import { Link } from "react-router-dom";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";

function SKipDash() {
  return (
    <div className="facebook-dashboard">
      {/* Header */}
      <div className="header2">
        <div className="header-left">
          <Link to="/">
            <img src={Logo} alt="skip Logo" className="logo" />
          </Link>
          <Input
            type="text"
            className="search_input"
            placeholder="Search Skip"
          />
        </div>
        <div className="header-center">
          {/* Center area (optional for icons) */}
        </div>
        <div className="header-right space-me">
          <div className="header_ics">
            <AppstoreFilled className="ticket-icon shadeMe" />
            <WechatOutlined className="chat-bubble shadeMe" />
            <BellFilled className="notification-bell shadeMe" />
          </div>

          <img src={profileImg} alt="User" />
        </div>
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
