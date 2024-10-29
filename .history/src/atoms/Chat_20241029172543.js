// Chat.js
import { Avatar, Collapse, Modal, Input, Button, Progress, notification } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import axios from "axios";
import TestImg from "../assets/pp.jpg";

const Chat = () => {
  const { all_attended = [], chatRooms = [], user } = useContext(AuthContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Functions (getAttendeeInfo, openChat, fetchMessages, sendMessage) remain unchanged...

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
      />

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
                  className={`chat-message ${
                    msg.senderId === user.userId ? "outgoing" : "incoming"
                  }`}
                >
                  <p>{msg.messageContent}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}

          {loading && <Progress percent={100} showInfo={false} />}

          <div className="chat-input-container">
            <Input.TextArea
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="chat-actions">
              <Button>Share Contact</Button>
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
