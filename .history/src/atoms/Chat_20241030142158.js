import { Avatar, Collapse, Modal, Input, Button, Progress, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons"; // Import Delete Icon
import { useContext, useState, useEffect } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import TestImg from "../assets/pp.jpg";
import notificationSound from '../assets/sound/ss.mp3';

const Chat = () => {
  const { addNotification ,all_attended = [], chatRooms = [], user, events } = useContext(AuthContext);
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

  // ...rest of your code
  
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

  return (
    <div className="chat-div">
      {/* Existing code for displaying chat rooms */}

      {/* Chat Modal */}
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
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${msg.senderId === user.userId ? "outgoing" : "incoming"}`}
                  style={msg.messageContent.includes("Contact Info") ? { color: "white", backgroundColor:"#128d25" } : {}} // Unique color for contact messages
                >
                  <p>{msg.messageContent}</p>
                  <small>{formatDate(msg.timestamp)}</small> {/* Format the date here */}

                  {/* Conditionally render delete icon for current user's messages */}
                  {msg.senderId === user.userId && (
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => deleteMessage(msg.messageId)}
                      danger
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
              <Button onClick={shareContact}>Share Contact</Button>
              <Button type="primary" onClick={sendMessage}>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
