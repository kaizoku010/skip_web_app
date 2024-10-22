import { Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";

const Chat = () => {
  const {
    chatRooms,
    selectedRoom,
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    selectRoom,
  } = useContext(AuthContext);
  const { Panel } = Collapse;
  return (
    <div className="chat-div">
      <Collapse>
        {chatRooms.length > 0 ? (
          chatRooms.map((room) => (
            <Panel
              header={room.name}
              key={room.chatRoomId}
              onClick={() => selectRoom(room.chatRoomId)}
            >
              <div>
                <p>Chat Room: {room.roomName}</p>
                <p>Participants: {room.participants.join(", ")}</p>
                <div>
                  {messages.map((msg) => (
                    <p key={msg.messageId}>
                      {msg.senderId}: {msg.content} <em>{msg.timestamp}</em>
                    </p>
                  ))}
                </div>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </Panel>
          ))
        ) : (
          <p>No active chat rooms</p>
        )}
      </Collapse>
    </div>
  );
};

export default Chat;
