// Kingslanding.js
import React, { useContext, useEffect } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";
import EventsContext from '../logic/DataPoint';

function Kingslanding() {
  const { events, loading, error } = useContext(EventsContext);
  // console.log("data_des", events);

  useEffect(() => {
    // Ensure events are correctly logged or handled here
  }, [events]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom evnts={events} />
        {/* Pass events array to AllEventsAtom */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Kingslanding;
