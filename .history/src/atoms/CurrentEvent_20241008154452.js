import React from 'react'
import "./current_event.css"

function CurrentEvent() {


    let event = 1;

    if (event != 0) {
        return (
            <div className='user_current_event'>
        <div className='no_event_found'>🥺 No Event Data found....</div>
        
            </div>
          )
  return (
    <div className='user_current_event'>
<div className='no_event_found'>🥺 No Event Data found....</div>

    </div>
  )
}

export default CurrentEvent