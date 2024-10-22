import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios, { all } from 'axios';

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
  const [comments, setComments] = useState([]); // Store comments
  const [commentText, setCommentText] = useState(''); // Store input value for comment
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); // Like status
  const [sentChatRequests, setSentChatRequests] = useState([]);
  const [all_attended, setAllAttended] = useState();
  const [requestsFiltered, setRequstesFiltred] = useState()

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

  useEffect(() => {
    if (user) {
      fetchSentChatRequests(user?.userId); // assuming user object has userId
    }
  }, [user]);

  const fetchSentChatRequests = async () => {
    try {
      const response = await axios.get(`https://skip-api-1gup.onrender.com/get_sent_chat_reqs/${user.userEmail}`);
     
      setSentChatRequests(response.data);
    } catch (error) {
      console.error("Error fetching sent chat requests:", error);
    }
  };

  const getAllAttendees = useCallback(async () => {
    try {
      // Flatten all the attendees from each event into one array
      const all_attendees = events.flatMap(event => event.attendees || []); 
      setAllAttended(all_attendees);
      console.log(all_attendees);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  }, [events]); // Added `events` as a dependency to ensure it updates when the events change
  

  useEffect(() => {
    if (events.length > 0) {
      getAllAttendees();
    }
  }, [events]); // Call getAllAttendees whenever events change
  
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

  const sendChatRequest = async (recieverId, senderId) => {
    try {
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/chat_request/${recieverId}`,
        { senderId }
      );
  
      // Check if the response is successful and return accordingly
      if (response.status === 201) {
        return { success: true }; // Return success if the request was successful
      } else {
        return { success: false }; // Return failure if the response status is not 200
      }
    } catch (error) {
      console.error('Error sending chat request:', error);
      // Ensure that failure is returned on error
      return { success: false };
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
  
  // const userEventID = events.find(eventObj => 
  //   eventObj.attendees.some(attendee => attendee.userEmail === user.userEmail),
  // );
  
  // console.log("user current  event id", user);


  const fetchPosts = useCallback(async (userId, eventId) => {
    if (!userId || !eventId) return;
    try {
      const response = await axios.get('https://skip-api-1gup.onrender.com/get_all_posts', {
        params: {
          userId: userId,
          eventId: eventId,
        },
      });
      setPosts(response.data); // Store posts in state
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);
  

  const deletePost = async (postId, eventId) => {
    // setLoading(true);
    try {
      const response = await axios.delete(`https://skip-api-1gup.onrender.com/delete_post/${eventId}/${postId}`);
      if (response.status === 200) {
        // Remove the post from the local posts state
        setPosts(posts.filter(post => post.postId !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } 
  };

  //handle commenting...like a pro sebo
  const handleAddComment = async (commentText, postId) => {
    if (!commentText) return;

    try {
      await axios.post(`https://skip-api-1gup.onrender.com/add_comment/${eventId}/${postId}`, {
        userName: user.userName,
        userImage: user.userImage,
        comment: commentText,
      });
      setCommentText(''); // Clear input
      fetchComments(); // Re-fetch comments to update the list
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  //handle likse like facebook.
  const handleToggleLike = async (postId) => {
    try {
      if (liked) {
        // Unlike the post
        await axios.post(`https://skip-api-1gup.onrender.com/unlike_post/${eventId}/${postId}`, {
          userId: user.userId,
        });
        setLikes(likes - 1);
      } else {
        // Like the post
        await axios.post(`https://skip-api-1gup.onrender.com/like_post/${eventId}/${postId}`, {
          userId: user.userId,
        });
        setLikes(likes + 1);
      }
      setLiked(!liked); // Toggle like status
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

    // Function to fetch comments
    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(`https://skip-api-1gup.onrender.com/get_comments/${eventId}/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  


    //people who sent u request...
    const getMatchingAttendees = (attendees, chatRequests) => {
      // Extract the receiverIds from chatRequests
      const receiverEmails = chatRequests.map(request => request.receiverId);
    
      // Filter the attendees based on whether their email is in receiverEmails
      const matchingAttendees = attendees.filter(attendee => 
        receiverEmails.includes(attendee.userEmail)
      );
    
      return matchingAttendees;
    };
    
    // Usage in your component
    useEffect(() => {
      if (all_attended && sentChatRequests) {
        const matchingAttendees = getMatchingAttendees(all_attended, sentChatRequests);
        console.log('Matching attendees:', matchingAttendees);
        // Do something with matchingAttendees, e.g., update state or display them
      }
    }, [all_attended, sentChatRequests]);
    
  return (
    <AuthContext.Provider 
      value={{
        checkout_status,
        deletePost, 
        checkoutJob, 
        events, 
        user, 
        login, 
        posts, 
        fetchPosts,
        logout, 
        loading, 
        error,
        handleAddComment,
        comments,
        commentText,
        setCommentText,
        handleToggleLike,
        likes,
        liked,
        fetchComments,
        sendChatRequest,
        sentChatRequests,
        all_attended,
        getAllAttendees
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};

export default AuthProvider;
