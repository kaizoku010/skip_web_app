import { Avatar, Collapse, Modal, Input, Button } from "antd";
import { useContext, useState, useEffect } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import TestImg from "../assets/pp.jpg";

const Chat = () => {
  const { all_attended = [], chatRooms = [], user } = useContext(AuthContext);
  const [chatMembers, setChatMembers] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);

  // Function to get user details from attendee list based on participant's email
  const getAttendeeInfo = (email) => {
    return all_attended?.find((attendee) => attendee.userEmail === email);
  };

  // Function to handle opening the chat
  const openChat = (room) => {
    setSelectedRoom(room);
    setChatModalVisible(true);
    fetchMessages(room.chatRoomId); // Fetch messages when opening chat
  };

  // Function to fetch messages for the selected room
  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(`/chat_rooms/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post("/send_message", {
        chatRoomId: selectedRoom.chatRoomId,
        messageContent: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setNewMessage(""); // Clear the input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-div">
      <Collapse
        items={[
          {
            key: "1",
            label: "Sk!p Friends",
            children: (
              <div>
                {chatRooms.length > 0 ? (
                  chatRooms.map((room) => {
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
                          onClick={() => openChat(room)} // Open chat on click
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
                            <p className="chat-job">
                              {participantInfo.job}
                            </p>
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
        title={`Chat with ${
          selectedRoom ? selectedRoom.participants[0] : ""
        }`}
        visible={chatModalVisible}
        onCancel={() => setChatModalVisible(false)}
        footer={null}
      >
        <div className="chat-modal-content">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.senderId === user.userId ? "outgoing" : "incoming"
                }`}
              >
                <p>{msg.messageContent}</p>
                <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <Input.TextArea
              rows={2}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="primary" onClick={sendMessage}>
              Share Contac
            </Button>
            <Button type="primary" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
