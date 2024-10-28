import React from 'react'
import { BottomNavigation } from "reactjs-bottom-navigation";
import { BellFilled, AppstoreFilled, WechatOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


function Mobilehome() {
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
          onClick: () => navigate("/register"), // Navigate to User Details
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
    <div>
<BottomNavigation
          items={bottomNavItems}
          selected={0}
          onItemClick={(item) => console.log(item)}
          activeBgColor="slateBlue"
          activeTextColor="white"
        />
    </div>
  )
}

export default Mobilehome