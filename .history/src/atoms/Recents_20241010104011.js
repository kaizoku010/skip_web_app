import React from 'react'
import "./recent.css"
import { Typography } from 'antd';

function Recents() {


    const { Title } = Typography;

  return (
    <div className='recents'>Recents
    <div className='recents_title'><Title>Our Recent Events</Title></div>
    </div>
  )
}

export default Recents