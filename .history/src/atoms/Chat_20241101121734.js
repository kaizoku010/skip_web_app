import {
  Avatar,
  Collapse,
  Modal,
  Button,
  notification,
  Divider,
  Badge,
} from "antd";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import TestImg from "../assets/pp.jpg";
import notificationSound from "../assets/sound/ss.mp3";
import { DeleteFilled } from "@ant-design/icons";

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
      });
    }
  }, [messageCount, userEvents]);

  const getAttendeeInfo = (email) => {
    return all_attended?.find((attendee) => attendee.userEmail === email);
  };

  const openChat = (room) => {
    setSelectedRoom(room);
    setChatModalVisible(true);
  
    fetchMessages(room.chatRoomId).then(() => {
      setLastReadMessages((prev) => ({
        ...prev,
        [room.chatRoomId]: messages.length,
      }));
    });
  };

  const getUnreadCount = (room) => {
    const lastReadCount = lastReadMessages[room.chatRoomId] || 0;
    const totalMessages = room.messages?.length || 0;
    const unreadCount = totalMessages - lastReadCount;

    return unreadCount > 0 ? unreadCount : 0;
  };

  useEffect(() => {
    const savedLastReadMessages = JSON.parse(
      localStorage.getItem("lastReadMessages")
    );
    if (savedLastReadMessages) setLastReadMessages(savedLastReadMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastReadMessages", JSON.stringify(lastReadMessages));
  }, [lastReadMessages]);

  useEffect(() => {
    const pollMessages = () => {
      if (selectedRoom) {
        fetchMessages(selectedRoom.chatRoomId);
      }
    };
    const intervalId = setInterval(pollMessages, 5000);
    return () => clearInterval(intervalId);
  }, [selectedRoom]);

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(
        `https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`
      );
      setMessages(response.data);
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

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
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

                      const unreadCount = getUnreadCount(room);
                      const isNew = unreadCount > 0;

                      return (
                        <div
                          className="chat-room-item"
                          onClick={() => openChat(room)}
                          key={room.chatRoomId}
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
                          <Badge
                            count={isNew ? "New" : 0}
                            style={{
                              backgroundColor: "#52c41a",
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                            }}
                          />
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

      <Modal
        title={`Chat with ${selectedRoom ? selectedRoom.participants[1] : ""}`}
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
                  className={`chat-message ${
                    msg.senderId === user.userId ? "outgoing" : "incoming"
                  }`}
                  style={
                    msg.messageContent.includes("shared their contact info")
                      ? { color: "white", backgroundColor: "#128d259c" }
                      : {}
                  }
                >
                  <p>{msg.messageContent}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  {msg.senderId === user.userId && (
                    <DeleteFilled
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
            />
            <Button
              type="primary"
              onClick={sendMessage}
              loading={loading}
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
