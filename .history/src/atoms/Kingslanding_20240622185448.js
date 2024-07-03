import React, { useEffect, useState } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";
import { dynamoDB } from '../operations'; // Adjust the import based on your AWS configuration

function Kingslanding() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          TableName: 'events', // Replace with your DynamoDB table name
        };
        
        const data = await dynamoDB.scan(params).promise();
        if (data.Items) {
          const newEvents = data.Items.map(item => ({
            id: item.mdx, // Adjust the key based on your DynamoDB schema
            ...item // Include other attributes as needed
          }));
          setEvents(newEvents);
        } else {
          console.log("No events found in DynamoDB.");
        }
      } catch (error) {
        console.error("Error fetching events from DynamoDB: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='kings-holder'>
      {/* Uncomment this section if needed */}
      {/* <div className='heading-holder'>
        <h1 className='welcome-note'>All Cooperate Events From</h1>
        <h2 className='heading'>leading companies in one place.</h2>
      </div> */}
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom allEvents={events} />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Kingslanding;
