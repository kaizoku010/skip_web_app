import { Collapse } from 'antd';
import { useState } from 'react';
import "./chat.css"

const { Panel } = Collapse;

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const addChatRoomToCollapsible = (chatRoom) => {
    setChatRooms((prevRooms) => [...prevRooms, chatRoom]);
  };

  return (
    <div>

    
    <Collapse>
      {chatRooms.map((room) => (
        <Panel header={room.name} key={room.chatRoomId}>
          <p>Chat between {room.participants.join(", ")}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default Chat