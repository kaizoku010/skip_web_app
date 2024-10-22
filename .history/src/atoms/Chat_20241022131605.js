import { Collapse } from "antd";
import { useContext, useState } from "react";
import "./chat.css";
import { AuthContext } from "../logic/AuthContext";

const Chat = () => {
  const {

    chatRooms,
    isRoomCreated,
  } = useContext(AuthContext);

  const { Panel } = Collapse;
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
