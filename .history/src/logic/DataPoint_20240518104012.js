import React, { createContext, useEffect, useState } from 'react';
import { firestore, collection, onSnapshot, query } from '../operations/firebase';


const EventsContext = createContext();

export const DataPoint =({})=>{
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const eventQuery = query(collection(firestore, "events"));
            const unsub = onSnapshot(eventQuery, (docs) => {
              const newEvents = [];
              docs.forEach((doc) => {
                const event = doc.data();
                event.id = doc.id;
                newEvents.push(event);
              });
              setEvents(newEvents);
            });
            return () => unsub(); // Cleanup subscription on unmount
          } catch (error) {
            console.log("Error fetching events: ", error);
          }
        };
        fetchEvents();
      }, []);
    
      return (
        <EventsContext.Provider value={events}>
          {children}
        </EventsContext.Provider>
      );
    };
    

    export default