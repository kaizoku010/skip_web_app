import React, { createContext, useEffect, useState } from 'react';
import { firestore, collection, onSnapshot, query } from '../operations/firebase';

const EventsContext = createContext();

export const DataPoint = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = () => {
      try {
        const eventQuery = query(collection(firestore, "events"));
        const unsub = onSnapshot(eventQuery, (snapshot) => {
          const newEvents = [];
          snapshot.forEach((doc) => {
            const event = doc.data();
            event.id = doc.id;
            newEvents.push(event);
          });
          setEvents(newEvents);
          setLoading(false);
        }, (err) => {
          setError(err);
          setLoading(false);
        });
        return () => unsub(); // Cleanup subscription on unmount
      } catch (error) {
        console.error("Error fetching events: ", error);
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
