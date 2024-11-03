import React, { useEffect, useState } from "react";
import axios from "axios";
import DxBadge from "./DxBadge"; // Import your badge component
import MessageList from "./MessageList"; // Your message list component
import ChatInput from "./ChatInput"; // Your chat input component

const ChatRoom = ({ selectedRoom }) => {
  const [messages, setMessages] = useState([]);
  const [lastReadMessages, setLastReadMessages] = useState({});

  // Fetch messages whenever the selectedRoom changes
  useEffect(() => {
    const fetchMessages = async roomId => {
      try {
        const response = await axios.get(`https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`);
        setMessages(response.data.messages || []); // Set messages from API response
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (selectedRoom) {
      fetchMessages(selectedRoom.chatRoomId);
    }
  }, [selectedRoom]);

  // Update last read messages count
  useEffect(() => {
    if (selectedRoom) {
      setLastReadMessages(prev => ({
        ...prev,
        [selectedRoom.chatRoomId]: messages.length, // Update with the total number of messages
      }));
    }
  }, [messages, selectedRoom]);

  // Calculate unread count for a given room
  const getUnreadCount = room => {
    const totalMessages = room.messages.length; // Total messages in the room
    const lastReadCount = lastReadMessages[room.chatRoomId] || 0; // Last read count
    const unreadCount = Math.max(totalMessages - lastReadCount, 0); // Unread messages

    return unreadCount;
  };

  // Handle sending new messages
  const handleSendMessage = async (newMessage) => {
    try {
      await axios.post(`https://skip-api-1gup.onrender.com/chat_rooms/${selectedRoom.chatRoomId}/messages`, {
        message: newMessage,
      });
      // Optionally fetch messages again or update the state to reflect the new message
      fetchMessages(selectedRoom.chatRoomId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-room">
      <h2>{selectedRoom ? selectedRoom.name : "Select a Room"}</h2>
      {selectedRoom && (
        <DxBadge count={getUnreadCount(selectedRoom)} style={{ position: "absolute", top: "10px", right: "10px" }} />
      )}
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
