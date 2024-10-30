import { Avatar, Collapse, Modal, Input, Button, Progress, notification } from "antd";
import { DeleteOutlined } from '@ant-design/icons'; // Import Delete Icon
import { useContext, useState, useEffect } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import TestImg from "../assets/pp.jpg";
import notificationSound from '../assets/sound/ss.mp3';

const Chat = () => {
  const { addNotification, all_attended = [], chatRooms = [], user, events } = useContext(AuthContext);
  const [chatMembers, setChatMembers] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareContactCount, setShareContactCount] = useState(0); // Track share contact button clicks
  const [messageCount, setMessageCount] = useState(0); // Track messages sent
  const [userEvent_, setUserEvent] = useState();
  const [notifications, setNotifications] = useState([]); // State for notifications

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showBrowserNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
      playNotificationSound(); // Play sound as well
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  const openChat = (room) => {
    setSelectedRoom(room);
    setChatModalVisible(true);
    fetchMessages(room.chatRoomId);
  };

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(`https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    if (!selectedRoom || !selectedRoom.participants || selectedRoom.participants.length < 2) {
      console.error("Participants not found in selectedRoom!");
      return;
    }

    const receiverEmail = selectedRoom.participants[1];

    try {
      setLoading(true);
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/send_message/${user.userId}/${receiverEmail}`,
        {
          chatRoomId: selectedRoom.chatRoomId,
          messageContent: newMessage,
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setNewMessage("");
      setMessageCount((prevCount) => prevCount + 1); // Increment message count

      showBrowserNotification('Message Sent', 'Your message has been successfully sent.');
      playNotificationSound(); // Play sound on success

    } catch (error) {
      console.error("Error sending message:", error);
      notification.error({
        message: 'Message Sending Failed',
        description: 'There was an error sending your message.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true); // Show loading indicator
      await axios.delete(`https://skip-api-1gup.onrender.com/delete_message/${messageId}`);
      
      setMessages((prevMessages) => prevMessages.filter(msg => msg.messageId !== messageId));
      
      notification.success({
        message: 'Message Deleted',
        description: 'The message has been successfully deleted.',
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      notification.error({
        message: 'Delete Failed',
        description: 'There was an error deleting the message.',
      });
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) !== 1 ? 's' : ''} ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) !== 1 ? 's' : ''} ago`;
    
    return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="chat-div">
      <Modal
        title={`Chat with ${selectedRoom ? selectedRoom.participants[0] : ""}`}
        open={chatModalVisible}
        onCancel={() => setChatModalVisible(false)}
        footer={null}
      >
        <div className="chat-modal-content">
          {!messages.length ? (
            <p>Loading messages...</p>
          ) : (
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.messageId}
                  className={`chat-message ${msg.senderId === user.userEmail ? "outgoing" : "incoming"}`}
                  style={msg.messageContent.includes("Contact Info") ? { color: "white", backgroundColor:"#128d25" } : {}}
                >
                  <p>{msg.messageContent}</p>
                  <small>{formatDate(msg.timestamp)}</small>
                  {/* Conditionally render delete icon if the message belongs to the current user */}
                  {msg.senderId === user.userEmail && (
                    <DeleteOutlined
                      style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                      onClick={() => deleteMessage(msg.messageId)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {loading && <Progress percent={100} showInfo={false} />}

          <div className="chat-input-container">
            <Input.TextArea
              rows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="chat-actions">
              <Button onClick={sendMessage}>Send Message</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
