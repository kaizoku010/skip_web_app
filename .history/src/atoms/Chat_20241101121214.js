import {
  Avatar,
  Collapse,
  Modal,
  Button,
  notification,
  Divider,
} from "antd";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import TestImg from "../assets/pp.jpg";
import notificationSound from "../assets/sound/ss.mp3";
import { DeleteFilled } from "@ant-design/icons";
import DxBadge from "./DxBadge";

const Chat = () => {
  const {
    addNotification,
    all_attended = [],
    chatRooms = [],
    user,
    events,
  } = useContext(AuthContext);

  // State hooks for managing chat
  const [chatMembers, setChatMembers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareContactCount, setShareContactCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [lastReadMessages, setLastReadMessages] = useState({});

  // Retrieve user events
  const userEvents = events.find(event =>
    event.attendees.some(attendee => attendee.userEmail === user.userEmail)
  );

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Notifications logic
  const showBrowserNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
      playNotificationSound();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch(error => console.error("Error playing sound:", error));
  };

  useEffect(() => {
    if (userEvents) {
      setChatMembers(prev => ({
        ...prev,
        messageCount,
        shareContactCount,
      }));
    }
  }, [messageCount, shareContactCount, userEvents]);

  // Fetch messages for the selected room
  const fetchMessages = async roomId => {
    try {
      const response = await axios.get(
        `https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle opening chat rooms
  const openChat = room => {
    setSelectedRoom(room);
    setChatModalVisible(true);
    fetchMessages(room.chatRoomId);
  };

  const getUnreadCount = room => {
    const lastReadCount = lastReadMessages[room.chatRoomId] || 0;
    const totalMessages = room.messages?.length || 0;
    return Math.max(totalMessages - lastReadCount, 0);
  };

  // Load and save last read messages to local storage
  useEffect(() => {
    const savedLastReadMessages = JSON.parse(localStorage.getItem("lastReadMessages"));
    if (savedLastReadMessages) setLastReadMessages(savedLastReadMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastReadMessages", JSON.stringify(lastReadMessages));
  }, [lastReadMessages]);

  // Sending messages logic
  const sendMessage = async () => {
    if (newMessage.trim() === "" || !selectedRoom) return;

    const receiverEmail = selectedRoom.participants[1];

    try {
      setLoading(true);
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/send_message/${user.userId}/${receiverEmail}`,
        { chatRoomId: selectedRoom.chatRoomId, messageContent: newMessage }
      );

      setMessages(prev => [...prev, response.data.message]);
      setNewMessage("");
      setMessageCount(prev => prev + 1);
      showBrowserNotification("Message Sent", "Your message has been successfully sent.");
      playNotificationSound();
    } catch (error) {
      console.error("Error sending message:", error);
      notification.error({ message: "Message Sending Failed", description: "There was an error sending your message." });
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async messageId => {
    try {
      setLoading(true);
      await axios.delete(`https://skip-api-1gup.onrender.com/delete_message/${messageId}`);
      setMessages(prevMessages => prevMessages.filter(msg => msg.messageId !== messageId));
      notification.success({ message: "Message Deleted", description: "The message has been successfully deleted." });
    } catch (error) {
      console.error("Error deleting message:", error);
      notification.error({ message: "Delete Failed", description: "There was an error deleting the message." });
    } finally {
      setLoading(false);
    }
  };

  // Format date function
  const formatDate = timestamp => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) !== 1 ? "s" : ""} ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) !== 1 ? "s" : ""} ago`;
    
    return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) !== 1 ? "s" : ""} ago`;
  };

  // Unique chat rooms
  const uniqueChatRooms = chatRooms.filter((room, index, self) => {
    const participants = room.participants.sort();
    const roomKey = `${participants[0]}-${participants[1]}`;

    return index === self.findIndex(r => {
      const sortedParticipants = r.participants.sort();
      return `${sortedParticipants[0]}-${sortedParticipants[1]}` === roomKey;
    });
  });

  return (
    <div className="chat-div">
      <Divider style={{ marginTop: "-1rem" }} orientation="left">Chat</Divider>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Sk!p Friends" key="1">
          <div>
            {uniqueChatRooms.length > 0 ? (
              uniqueChatRooms.map(room => {
                const otherParticipant = room.participants.find(email => email !== user.userEmail);
                const participantInfo = all_attended.find(attendee => attendee.userEmail === otherParticipant);

                return participantInfo ? (
                  <div className="chat-room-item" onClick={() => openChat(room)} key={room.chatRoomId}>
                    <Avatar src={participantInfo.userImage || TestImg} />
                    <div className="chat-preview-content">
                      <p className="chat-userName"><strong>{participantInfo.username || "Unknown User"}</strong></p>
                      <p className="chat-job">{participantInfo.job}</p>
                    </div>
                    <DxBadge count={getUnreadCount(room)} style={{ position: "absolute", top: "10px", right: "10px" }} />
                  </div>
                ) : null;
              })
            ) : (
              <p>No Friends Yet :'(</p>
            )}
          </div>
        </Collapse.Panel>
      </Collapse>

      {/* Chat Modal */}
      <Modal
        title={`Chat with ${selectedRoom ? selectedRoom.participants[1] : ""}`}
        visible={chatModalVisible}
        onCancel={() => setChatModalVisible(false)}
        footer={null}
      >
        <div className="chat-modal-content">
          {!messages.length ? (
            <p>Loading messages...</p>
          ) : (
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.senderId === user.userId ? "outgoing" : "incoming"}`}>
                  <p>{msg.messageContent}</p>
                  <small>{formatDate(msg.timestamp)}</small>
                  {msg.senderId === user.userId && (
                    <DeleteFilled className="delete_btn" onClick={() => deleteMessage(msg.messageId)} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="chat-input-container">
            <textarea
              rows={5}
              className="chat-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onPressEnter={sendMessage}
            />
            <Button type="primary" onClick={sendMessage} loading={loading}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
