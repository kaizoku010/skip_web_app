import React from 'react'
import "./recent.css"
import { Typography } from 'antd';
import EventImage from "../assets/eyes.png"

function Recents() {


    const { Title } = Typography;

  return (
    <div className='recents'>
    <div className='recents_title'><Title level={2}>Our Recent Events</Title></div>
   <div className='recent_event_data'>
    <img src={EventImage} className='recent_img'/>
   </div>
    </div>
  )
}

export default Recents