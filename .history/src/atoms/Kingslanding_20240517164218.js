import React from 'react'
import "./Kingslanding.css"
import HeaderGlass from './HeaderGlass'
import AllEventsAtom from './AllEventsAtom'

function Kingslanding() {
  return (
    <div className='kings-holder'>
<div className='heading-holder'>
<h1 className='welcome-note'>All Coperate Events from</h1>
    <h2 className='heading'>leading companies in one place.</h2>
    
</div>
 
    <HeaderGlass/>
    <AllEventsAtom/>
    </div>
  )
}

export default Kingslanding