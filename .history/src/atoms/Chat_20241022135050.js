import { Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";

const Chat = () => {
    const { chatRooms } = useContext(AuthContext);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
  const { Panel } = Collapse;

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(`/chat_rooms/${roomId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    fetchMessages(roomId);
  };

  const sendMessage = async () => {
    if (!newMessage || !selectedRoom) return;

    try {
      const response = await axios.post(`/chat_rooms/${selectedRoom}/messages`, {
        senderId: "your_user_id", // replace with actual user ID
        content: newMessage,
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };




  return (
    <div className="chat-div">
      <Collapse>
        {chatRooms.length > 0 ? (
          chatRooms.map((room) => (
            <Panel header={room.name} key={room.chatRoomId}>
              <div key={room.chatRoomId}>
                <p>Chat Room: {room.roomName}</p>
                <p>Participants: {room.participants.join(", ")}</p>
              </div>
            </Panel>
          ))
        ) : (
          <p>No active chat rooms</p>
        )}

        {/* {chatRooms.map((room) => (
        <Panel header={room.name} key={room.chatRoomId}>
          <p>Chat between {room.participants.join(", ")}</p>
        </Panel>
      ))} */}
      </Collapse>
    </div>
  );
};

export default Chat;
