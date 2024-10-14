import React from 'react'
import "./recent.css"
import { Typography } from 'antd';

function Recents() {


    const { Title } = Typography;

  return (
    <div className='recents'>
    <div className='recents_title'><Title level={2}>Our Recent Events</Title></div>
    </div>
  )
}

export default Recents