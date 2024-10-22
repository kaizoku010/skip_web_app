import { Collapse } from 'antd';
import { useState } from 'react';
import "./chat.css"
import { AuthContext } from './AuthProvider';
const { chatRequests, acceptRequest, declineRequest, chatRooms, isRoomCreated } = useContext(AuthContext);

const { Panel } = Collapse;

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const addChatRoomToCollapsible = (chatRoom) => {
    setChatRooms((prevRooms) => [...prevRooms, chatRoom]);
  };

  return (
    <div className='chat-div'>
    <Collapse>
      {chatRooms.map((room) => (
        <Panel header={room.name} key={room.chatRoomId}>
          <p>Chat between {room.participants.join(", ")}</p>
        </Panel>
      ))}
    </Collapse>
    </div>
  );
};

export default Chat