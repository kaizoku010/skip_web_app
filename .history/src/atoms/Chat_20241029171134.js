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
      const response = await axios.get(`https://skip-api-1gup.onrender.com/chat_rooms/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to send a new message
// Function to send a new message
// Function to send a new message
const sendMessage = async () => {
  if (newMessage.trim() === "") return;

  // Log selectedRoom for debugging
  console.log("Selected Room:", selectedRoom);

  // Ensure selectedRoom and its participants are available
  if (!selectedRoom || !selectedRoom.participants || selectedRoom.participants.length < 2) {
    console.error("Participants not found in selectedRoom!");
    return; // Exit if selectedRoom or participants are missing
  }

  // Get the receiver email directly from the participants array
  const receiverEmail = selectedRoom.participants[1]; // Always take the second participant

  try {
    // Post message to the backend
    const response = await axios.post(
      `https://skip-api-1gup.onrender.com/send_message/${user.userId}/${receiverEmail}`, // Use receiver email
      {
        chatRoomId: selectedRoom.chatRoomId, // Pass chatRoomId
        messageContent: newMessage, // Pass message content
      }
    );

    // Add the new message to the messages state
    setMessages((prevMessages) => [...prevMessages, response.data.message]);
    setNewMessage(""); // Clear the input field
  } catch (error) {
    console.error("Error sending message:", error);
  }
};



  // Remove duplicate chat rooms based on senderId and receiverId
  const uniqueChatRooms = chatRooms.filter((room, index, self) => {
    // Normalize sender and receiver IDs
    const participants = room.participants.sort(); // Sort participants to handle (A, B) and (B, A) the same
    const roomKey = `${participants[0]}-${participants[1]}`;

    // Use a Set to check for duplicates
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
  open={chatModalVisible} // Update here
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

    <div className="chat-input-container">
      <Input.TextArea
        rows={5}
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
