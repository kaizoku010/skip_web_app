// DataPoint.js
import React, { createContext, useEffect, useState } from 'react';
import { dynamoDB } from '../operations/awsConfig'; // Adjust based on your AWS configuration

const EventsContext = createContext();

export const DataPoint = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          TableName: "events" // Replace with your DynamoDB table name
        };
        const data = await dynamoDB.scan(params).promise();
        const eventsData = Array.isArray(data.Items) ? data.Items : [];
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events from AWS DynamoDB: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  return (
    <EventsContext.Provider value={{ events, loading, error }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
