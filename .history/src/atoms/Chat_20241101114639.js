import {
  Avatar,
  Collapse,
  Modal,
  Input,
  Button,
  Popover,
  notification,
  Divider,
  Badge,
} from "antd";
import { useContext, useState, useEffect } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
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
  const [chatMembers, setChatMembers] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareContactCount, setShareContactCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [userEvent_, setUserEvent] = useState();
  const [notifications, setNotifications] = useState([]);
  const [lastReadMessages, setLastReadMessages] = useState({});

  const userEvents = events.find((event) =>
    event.attendees.some((attendee) => attendee.userEmail === user.userEmail)
  );

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showBrowserNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
      playNotificationSound();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  useEffect(() => {
    if (userEvents) {
      setUserEvent({
        ...userEvents,
        messageCount: messageCount,
        shareContactCount: shareContactCount,
      });
    }
  }, [messageCount, shareContactCount, userEvents]);

  const getAttendeeInfo = (email) => {
    return all_attended?.find((attendee) => attendee.userEmail === email);
  };

  const openChat = (room) => {
    setSelectedRoom(room);
    setChatModalVisible(true);
  
    // Fetch messages for the selected room
    fetchMessages(room.chatRoomId).then(() => {
      // Update lastReadMessages for the selected room upon opening the chat
      setLastReadMessages((prev) => ({
        ...prev,
        [room.chatRoomId]: messages.length, // Save the last-read count only when opening
      }));
    });
  };



  const getUnreadCount = (room) => {
    const lastReadCount = lastReadMessages[room.chatRoomId] || 0;
    const totalMessages = room.messages?.length || 0;
    const unreadCount = totalMessages - lastReadCount;
    console.log(`Total messages: ${totalMessages}, Last read: ${lastReadCount}`);

    console.log(`Unread count for room ${room.chatRoomId}:`, unreadCount); // Debugging line

    return unreadCount > 0 ? unreadCount : 0;
  };
  // Load from local storage on mount
  useEffect(() => {
    const savedLastReadMessages = JSON.parse(
      localStorage.getItem("lastReadMessages")
    );
    if (savedLastReadMessages) setLastReadMessages(savedLastReadMessages);
  }, []);

  // Save to local storage when lastReadMessages changes
  useEffect(() => {
    localStorage.setItem("lastReadMessages", JSON.stringify(lastReadMessages));
  }, [lastReadMessages]);


  useEffect(() => {
    // Define a function that will be called periodically
    const pollMessages = () => {
      if (selectedRoom) {
        fetchMessages(selectedRoom.chatRoomId);
      }
    };
  
    // Set up polling with an interval of 5 seconds
    const intervalId = setInterval(pollMessages, 5000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedRoom]); // Run this effect when selectedRoom changes
  

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(
        `https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`
      );
      setMessages(response.data);
  
      // No updates to lastReadMessages here
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    if (
      !selectedRoom ||
      !selectedRoom.participants ||
      selectedRoom.participants.length < 2
    ) {
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
      setMessageCount((prevCount) => prevCount + 1);
      showBrowserNotification(
        "Message Sent",
        "Your message has been successfully sent."
      );
      playNotificationSound();
    } catch (error) {
      console.error("Error sending message:", error);
      notification.error({
        message: "Message Sending Failed",
        description: "There was an error sending your message.",
      });
    } finally {
      setLoading(false);
    }
  };

  const shareContact = async () => {
    if (!selectedRoom || selectedRoom.participants.length < 2) return;

    const contactEmail = selectedRoom.participants[0];
    const contactInfo = getAttendeeInfo(contactEmail);
    const contactMessage = ` ${user.userName} just shared their contact info with you, Email: ${user.userEmail}, Phone Number ${user.phone}`;

    try {
      setLoading(true);
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/send_message/${user.userId}/${contactEmail}`,
        {
          chatRoomId: selectedRoom.chatRoomId,
          messageContent: contactMessage,
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setShareContactCount((prevCount) => prevCount + 1);
      notification.success({
        message: "Contact Shared",
        description: "Contact details have been successfully shared.",
      });
      playNotificationSound();
    } catch (error) {
      console.error("Error sharing contact:", error);
      notification.error({
        message: "Contact Sharing Failed",
        description: "There was an error sharing the contact.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    if (seconds < 3600)
      return `${Math.floor(seconds / 60)} minute${
        Math.floor(seconds / 60) !== 1 ? "s" : ""
      } ago`;
    if (seconds < 86400)
      return `${Math.floor(seconds / 3600)} hour${
        Math.floor(seconds / 3600) !== 1 ? "s" : ""
      } ago`;

    return `${Math.floor(seconds / 86400)} day${
      Math.floor(seconds / 86400) !== 1 ? "s" : ""
    } ago`;
  };

  const uniqueChatRooms = chatRooms.filter((room, index, self) => {
    const participants = room.participants.sort();
    const roomKey = `${participants[0]}-${participants[1]}`;

    return (
      index ===
      self.findIndex((r) => {
        const sortedParticipants = r.participants.sort();
        return `${sortedParticipants[0]}-${sortedParticipants[1]}` === roomKey;
      })
    );
  });

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true); // Show loading indicator
      await axios.delete(
        `https://skip-api-1gup.onrender.com/delete_message/${messageId}`
      );

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.messageId !== messageId)
      );

      notification.success({
        message: "Message Deleted",
        description: "The message has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      notification.error({
        message: "Delete Failed",
        description: "There was an error deleting the message.",
      });
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="chat-div">
      <Divider style={{ marginTop: "-1rem" }} orientation="left">
        Chat
      </Divider>

      <Collapse
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: "Sk!p Friends",
            children: (
              <div>
                {uniqueChatRooms?.length > 0 ? (
                  uniqueChatRooms.map((room) => {
                    const otherParticipants = room.participants.filter(
                      (email) => email !== user.userEmail
                    );
                    return otherParticipants.map((participantEmail) => {
                      const participantInfo = getAttendeeInfo(participantEmail);
                      if (!participantInfo) return null;

                      return (
                        <div
                          className="chat-room-item"
                          onClick={() => openChat(room)}
                        >
                          <Avatar
                            className="sf-image"
                            src={participantInfo?.userImage || TestImg}
                          />
                          <div className="chat-preview-content">
                            <p className="chat-userName">
                              <strong>
                                {participantInfo.username || "Unknown User"}
                              </strong>
                            </p>
                            <p className="chat-job">{participantInfo.job}</p>
                          </div>
                         <DxBadge
                            count={getUnreadCount(room)}
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                            }}/>
                        </div>
                      );
                    });
                  })
                ) : (
                  <p>No Friends Yet :'(</p>
                )}
              </div>
            ),
          },
        ]}
      ></Collapse>

      {/* Chat Modal */}
      <Modal
        title={`Chat with ${selectedRoom ? selectedRoom.participants[1] : ""}`}
        open={chatModalVisible}
        onCancel={() => setChatModalVisible(false)}
        footer={null}
      >
        <div className="chat-modal-content">
          {/* Show loading indicator while fetching messages */}
          {!messages.length ? (
            <p>Loading messages...</p>
          ) : (
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.senderId === user.userId ? "outgoing" : "incoming"
                  }`}
                  style={
                    msg.messageContent.includes("shared their contact info")
                      ? { color: "white", backgroundColor: "#128d259c" } // Adjust text color and background color as needed
                      : {}
                  }
                >
                  <p>{msg.messageContent}</p>
                  <small>{formatDate(msg.timestamp)}</small>
                  {msg.senderId === user.userId && (
                    <DeleteFilled
                      color="white"
                      className="delete_btn"
                      onClick={() => deleteMessage(msg.messageId)}
                    />
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

            <Button
              type="primary"
              className="sendtext"
              onClick={sendMessage}
              loading={loading}
            >
              Send
            </Button>
            <Button type="default" onClick={shareContact} loading={loading}>
              Share Contact
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
