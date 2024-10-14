import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [checkout_status, setCheckoutStatus] = useState(false)
  const [eventId, setEventId] = useState(null)
  const [posts, setPosts] = useState([]); // State to store posts


  // Load user from localStorage if available when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('user_data');
    const savedToken = localStorage.getItem('auth_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser)); // Restore user state
    }
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://skip-api-1gup.onrender.com/get_all_events');
        setEvents(response.data); // Save the events data to state
      } catch (err) {
        setError('Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://skip-api-1gup.onrender.com/auth/login', { email, password });
      const { token, user } = response.data;

      // Store user and token in state
      setUser(user);

      // Save user and token to localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return true; // Login was successful
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      return false; // Return false indicating login failure
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  ///create attendee/ or add an attendee
  const checkoutJob = async (eventId) => {
    const user_Id = user?.userId;
    const userName = user?.userName;
    const phoneNumber = user?.phone;
    const email = user?.userEmail;
    const jobIndustry = user?.job;
    const userimage = user?.userImage;
  
    setLoading(true);
    try {
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/create_attendee/${eventId}`,
        {
          user_Id,
          userName,
          phoneNumber,
          email,
          jobIndustry,
          userimage,
        }
      );

      console.log("server response", response);
  
      // setCheckoutStatus(true); // Updates the state for global context
      return true; // Return true if the API call was successful
    } catch (error) {
      console.error('Checkout error:', error.response?.data?.message || error.message);
      setError(error);
      return false; // Return false if there was an error
    } finally {
      setLoading(false);
    }
  };
  
  const userEventID = events.find(eventObj => 
    eventObj.attendees.some(attendee => attendee.userEmail === user.userEmail),
  );
  
  // console.log("user current  event id", userEventID?.eventId);



 const fetchPosts = async () => {
    if (!user || !userEventID) return; // Check if user and event are available
    const eventId = userEventID.eventId;
    
    try {
      const response = await axios.get('https://skip-api-1gup.onrender.com/get_all_posts', {
        data: {
          userId: user.userId,
          eventId: eventId,
        }
      });
      setPosts(response.data); // Store posts in state
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Call fetchPosts whenever user or events change
  });


  return (
    <AuthContext.Provider value={{checkout_status, checkoutJob, events, user, login,posts, fetchPosts,logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
