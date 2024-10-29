import { Avatar, Collapse, Modal, Input, Button, Progress, notification } from "antd";
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

  // Find user events and include message count and shared contact count
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
      playNotificationSound(); // Play sound as well
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

  // console.log("user event: ", userEvent_);

  const getAttendeeInfo = (email) => {
    return all_attended?.find((attendee) => attendee.userEmail === email);
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

      notification.success({
        message: 'Message Sent',
        description: 'Your message has been successfully sent.',
      });

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

  // New function to share contact details
  const shareContact = async () => {
    if (!selectedRoom || selectedRoom.participants.length < 2) return;

    const contactEmail = selectedRoom.participants[0];
    const contactInfo = getAttendeeInfo(contactEmail);
    const contactMessage = `Contact Info: ${contactInfo.username}, Email: ${contactInfo.userEmail}`;

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
      setShareContactCount((prevCount) => prevCount + 1); // Increment share contact count

      notification.success({
        message: 'Contact Shared',
        description: 'Contact details have been successfully shared.',
      });
      playNotificationSound(); // Play sound on success

    } catch (error) {
      console.error("Error sharing contact:", error);
      notification.error({
        message: 'Contact Sharing Failed',
        description: 'There was an error sharing the contact.',
      });
    } finally {
      setLoading(false);
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
      <Collapse
        items={[
          {
            key: "1",
            label: "Sk!p Friends",
            children: (
              <div>
                {uniqueChatRooms.length > 0 ? (
                  uniqueChatRooms.map((room) => {
                    const otherParticipants = room.participants.filter(
                      (email) => email !== user.userEmail
                    );
                    return otherParticipants.map((participantEmail) => {
                      const participantInfo = getAttendeeInfo(participantEmail);
                      if (!participantInfo) return null;

                      return (
                        <div
                          key={room.chatRoomId}
                          className="chat-room-item"
                          onClick={() => openChat(room)}
                        >
                          <Avatar
                            className="sf-image"
                            src={participantInfo?.userImage || TestImg}
                          />
                          <div className="chat-preview-content">
                            <p className="chat-userName">
                              <strong>{participantInfo.username || "Unknown User"}</strong>
                            </p>
                            <p className="chat-job">{participantInfo.job}</p>
                          </div>
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
        title={`Chat with ${selectedRoom ? selectedRoom.participants[0] : ""}`}
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
                  className={`chat-message ${msg.senderId === user.userId ? "outgoing" : "incoming"}`}
                  style={msg.messageContent.includes("Contact Info") ? { color: "white", backgroundColor:"#128d25" } : {}} // Unique color for contact messages
                >
                  <p>{msg.messageContent}</p>
                  <small>{formatDate(msg.timestamp)}</small> {/* Format the date here */}
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
