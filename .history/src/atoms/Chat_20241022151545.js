import { Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";

const Chat = () => {
  const {

    chatRooms,
  } = useContext(AuthContext);
  console.log("chat rooms: ", chatRooms)
  const { Panel } = Collapse;

  return (
    return (
        <div className="chat-div">
          <Collapse>
            {chatRooms.length > 0 ? (
              chatRooms.map((room) => (
                <div key={room.chatRoomId} className="chat-room-item">
                  <p>Chat Room: {room.roomName}</p>
                  <p>Participants: {room.participants.join(", ")}</p>
                </div>
              ))
            ) : (
              <p>No active chat rooms</p>
            )}
          </Collapse>
        </div>
      );
    };


export default Chat;
