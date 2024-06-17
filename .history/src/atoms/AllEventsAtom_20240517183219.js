import React from 'react'
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'

function AllEventsAtom({allEvents}) {
  console.log("events passed: ", allEvents)
  return (
    <div className='all-Godly-people'>
    <h3 className='ev-titled'>Latest Events</h3>
    <div className='holders'>
      <ul>
        {allEvents?.map((event, index)=>{
          <li key={}> 
              <EventHolder imageLink={event.eventGraphicsURL} eventName={event.eventName} />

          </li>

        })}
      </ul>
    <EventHolder/>
    <EventHolder/>
    </div>
            
    </div>
  )
}

export default AllEventsAtom