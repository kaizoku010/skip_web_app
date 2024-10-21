import React, { useContext } from "react";
import "./skipdash.css";
import CurrentEvent from "./CurrentEvent";
import UserDetailsBar from "./UserDetailsBar";
import UserContent from "./UserContent";
import DashHeader from "./DashHeader";
import { AuthContext } from "../logic/AuthContext";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from  "reactjs-bottom-navigation";
import { BellFilled,AppstoreFilled, WechatOutlined } from "@ant-design/icons";

function SKipDash() {
  const { user, events, logout } = useContext(AuthContext);


  const  bottomNavItems = [
    {
      title:  "Home",
      onClick: ({ id }) =>  alert("menu clicked " + id),
      icon: <BellFilled />, // just for example
      activeIcon: <BellFilled color="#fff" />
    },
  
    // items can have either title, icon or both or neither!
    {
      title:  "News",
      onClick: ({ id }) =>  alert("menu clicked " + id),
      icon: <BellFilled />, // just for example
      activeIcon: <BellFilled color="#fff" />
    },
    // items can have either title, icon or both or neither!
    {
      title:  "Chat",
      onClick: ({ id }) =>  alert("menu clicked " + id),
      icon: <BellFilled />, // just for example
      activeIcon: <BellFilled color="#fff" />
    },
  
    {
      title:  "Chat",
      onClick: ({ id }) =>  alert("menu clicked " + id),
      icon: <BellFilled />, // just for example
      activeIcon: <BellFilled color="#fff" />
    },
  
    // // the render method enables custom item content
    // {
    //   render: ({ isActive, id }) =>  isActive ? <strong>{id}</strong> : <span>{id}</span>,
    // },
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
          <CurrentEvent events={events} user={user}/>
        </div>
      </div>
<div className="bottom-navigation-area"> 
<BottomNavigation
		items={bottomNavItems}
		selected={0}
		onItemClick={(item) =>  console.log(item)}
		activeBgColor="slateBlue"
		activeTextColor="white"
	/>
</div>
    </div>
  );
}

export default SKipDash;
