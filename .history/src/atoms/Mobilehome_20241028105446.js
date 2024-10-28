import React from 'react'

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