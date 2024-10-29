import React from 'react';
import { BottomNavigation } from "reactjs-bottom-navigation";
import { BellFilled, AppstoreFilled, ProfileOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Mobilehome() {
  const navigate = useNavigate(); // Hook for navigation
  
  const bottomNavItems = [
    {
      title: "Home",
      onClick: () => navigate("/content"), // Navigate to Home
      icon: <HomeOutlined />,
      activeIcon: <HomeOutlined color="#fff" />
    },
    {
      title: "Event Details",
      onClick: () => navigate("/currentevent"), // Navigate to User Details
      icon: <AppstoreFilled />,
      activeIcon: <AppstoreFilled color="#fff" />
    },
    {
      title: "Account",
      onClick: () => navigate("/userdetails"), // Navigate to Current Event
      icon: <ProfileOutlined />,
      activeIcon: <BellFilled color="#fff" />
    },
    // {
    //   title: "Chat",
    //   onClick: () => navigate("/content"), // Navigate to Chat
    //   icon: <WechatOutlined />,
    //   activeIcon: <WechatOutlined color="#fff" />
    // }
  ];

  return (
    <div className="mobile-bottom-nav">
      <BottomNavigation
        items={bottomNavItems}
        selected={0}
        onItemClick={(item) => console.log(item)}
        activeBgColor="#030933"
        activeTextColor="white"
      />
    </div>
  );
}

export default Mobilehome;
