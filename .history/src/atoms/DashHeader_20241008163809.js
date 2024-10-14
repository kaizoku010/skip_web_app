import React, { useState } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input } from "antd";
import { BellFilled } from "@ant-design/icons";
import { WechatOutlined } from "@ant-design/icons";
import { AppstoreFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Popover } from 'antd';
import Notifications from "./Notifications";


function DashHeader() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);


    const hide = () => {
      setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

  return (
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
    
    <div className="header-right space-me">
      <div className="header_ics">
        <AppstoreFilled className="ticket-icon shadeMe" />
        <Popover
      content={<Notifications/>}
      title="Skip Notifications"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
        <BellFilled className="notification-bell shadeMe" />
        </Popover>
        <Popover
      content={<Notifications/>}
      title="Skip Notifications"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
        <BellFilled className="notification-bell shadeMe" />
        </Popover>
      </div>
      
      <img src={profileImg} alt="User" />
    </div>
  </div>  )
}

export default DashHeader