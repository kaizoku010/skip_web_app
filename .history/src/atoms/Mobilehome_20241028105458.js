import React from 'react'
import { BottomNavigation } from "reactjs-bottom-navigation";
import { BellFilled, AppstoreFilled, WechatOutlined } from "@ant-design/icons";
function Mobilehome() {
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