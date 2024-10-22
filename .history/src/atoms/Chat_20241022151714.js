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
    <div className="chat-div">
      <Collapse
        items={[
            {
              key: "1",
              label: "Show Full List Of Received Friend Requests",
              children: (
                <div>
                  {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((request) => (
                      //                       <div key={request.id} className="current-user-section ibra" onClick={() => showUserDetails(request)}>

                      <div key={request.id} className="current-user-section ibra">
                        <img className="current-user-details" src={request.userImage || profileImg} alt="Profile" />
                        <div className="cu-text">
                          <p className="cu-username no-type">{request.username}</p>
                          <p className="cu_user_email no-type">{request.userEmail}</p>
                          <p style={{ fontSize: "smaller" }} className="cu_user_job no-type">
                            works at: {request.job}
                          </p>
                          <div className="udb-actions">
                            <Button className="udb-btn" type="primary" onClick={() => acceptRequest(request.requestId)}>
                              Approve
                            </Button>
                            <Button className="udb-btn udb-btn-decline" type="danger" onClick={() => declineRequest(request.requestId)}>
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No sent chat requests.</p>
                  )}
                </div>
              ),
            },
          ]}
      >
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
