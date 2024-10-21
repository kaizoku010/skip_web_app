import React, { useState, useMemo, useContext } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input } from "antd";
import { BellFilled } from "@ant-design/icons";
import { WechatOutlined } from "@ant-design/icons";
import { AppstoreFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Popover, Avatar } from 'antd';
import Notifications from "./Notifications";
import { AuthContext } from "../logic/AuthContext";


function DashHeader({user}) {
    const {logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [arrow, setArrow] = useState('Show');
    const [open4, setOpen4] = useState('Show');    
    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
          return false;
        }
        if (arrow === 'Show') {
          return true;
        }
        return {
          pointAtCenter: true,
        };
      }, [arrow]);
    
      const content_ = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      );

      const content_events = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p onClick={logout} className="frnds-chat">Friends List & Chat List</p>
          </div>
      );
      const content_friends = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p onClick={logout} className="frnds-chat">Friends List & Chat List</p>
        </div>
      );
    const hide = () => {
      setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
      };
      const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
      };

      const logout_ = (newOpen)=>{
        setOpen4(newOpen)
      }




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
    <div className="header-mobile"> 
      <div className="header_ics2">
      <Popover
      content={content_events}
      title="Friends and Chat"
      trigger="click"
      placement="bottom"
      arrow={mergedArrow}
      open={open1}
      onOpenChange={handleOpenChange1}
    >
        <AppstoreFilled className="notification-bell shadeMe" />
        </Popover>        <Popover
      content={content_friends}
      title="Chat"
      trigger="click"
      arrow={mergedArrow}
      placement="bottom"
      open={open2}
      onOpenChange={handleOpenChange2}
    >

        <WechatOutlined className="notification-bell shadeMe" />
        </Popover>
        <Popover
      content={<Notifications/>}
      title="Skip Notifications"
      trigger="click"
      arrow={mergedArrow}
      placement="bottom"
      open={open}
      onOpenChange={handleOpenChange}
    >
        <BellFilled className="notification-bell shadeMe" />
        </Popover>
      </div>
      </div>
    <div className="header-right space-me">
  
  <div className="main_header">
  <div className="header_ics">
      <Popover
      content={<Notifications/>}
      title="Menu"
      trigger="click"
      placement="left"
      arrow={mergedArrow}
      open={open1}
      onOpenChange={handleOpenChange1}
    >
        <AppstoreFilled className="notification-bell shadeMe" />
        </Popover>        <Popover
      content={<Notifications/>}
      title="Chat"
      trigger="click"
      arrow={mergedArrow}
      placement="left"
      open={open2}
      onOpenChange={handleOpenChange2}
    >

        <WechatOutlined className="notification-bell shadeMe" />
        </Popover>
        <Popover
      content={<Notifications/>}
      title="Skip Notifications"
      trigger="click"
      arrow={mergedArrow}
      placement="left"

      open={open}
      onOpenChange={handleOpenChange}
    >
        <BellFilled className="notification-bell shadeMe" />
        </Popover>
      </div>
    
  </div>
     
     
      <Popover
      content={content_}
      trigger="click"
      arrow={mergedArrow}
      placement="bottom"
      open={open4}
      onOpenChange={logout_}
    >
      <Avatar src={user.userImage}  size="large" alt="User" />
      </Popover>

    </div>
  </div>  )
}

export default DashHeader