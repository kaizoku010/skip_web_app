import { Avatar, Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";
import TestImg from "../assets/pp.jpg"

const Chat = () => {
  const {
    all_attended,
    chatRooms,
    user,
  } = useContext(AuthContext);
  console.log("chat rooms: ", chatRooms)
  console.log("all attendees: ", all_attended)
  const { Panel } = Collapse;

  const getAttendeeInfo = (email) => {
    return all_attended.find((attendee) => attendee.userEmail === email);
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
          chatRooms.map((room) => (
            <div key={room.chatRoomId} className="chat-room-item">
                <Avatar className="sf-image" src={TestImg}/>
                <div className="chat-preview-content">
                <p className="userName">Chat Room: {room.roomName}</p>
                <p className="msg-excpt">Participants: {room.participants.join(", ")}</p>
                </div>
            </div>
          ))
        ) : (
          <p>No active chat rooms</p>
        )}
        </div>
              ),
            },
          ]}
      >
      </Collapse>
    </div>
  );
};


export default Chat;
