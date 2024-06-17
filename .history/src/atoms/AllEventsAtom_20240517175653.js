import React from 'react'
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'

function AllEventsAtom() {
  return (
    <div className='all-Godly-people'>
    <h3 className='ev-titled'>Latest Events</h3>
    <div className='holders'>
    <EventHolder/>
    <EventHolder/>
    </div>
            
    </div>
  )
}

export default AllEventsAtom