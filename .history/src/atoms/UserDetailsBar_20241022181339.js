import React, { useContext, useEffect, useState } from "react";
import "./skipdash.css";
import profileImg from "../assets/pp.jpg";
import { Collapse, Divider, Avatar, Button, Modal } from "antd";
import { AuthContext } from "../logic/AuthContext";
import "./usdb.css";
import Chat from "./Chat";

function UserDetailsBar() {
  const [foundUsers, setFoundUsers] = useState([]);
  const { user, sentChatRequests, all_attended, myFriendRequests, getMatchingAttendees, declineRequest, acceptRequest } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // If the data is not yet available, return early
    if (!all_attended || !sentChatRequests || !myFriendRequests) {
      setLoading(true); // Keep loading state until data is available
      return;
    }
  
    // If all required data is available, proceed
    const matchingAttendees = getMatchingAttendees(all_attended, myFriendRequests);
    setFoundUsers(matchingAttendees);
    setLoading(false); // Data is available, stop loading
  
  }, [all_attended, sentChatRequests, myFriendRequests]);
  

  useEffect(() => {
    // console.log("all_attended", all_attended);
    // console.log("sentChatRequests", sentChatRequests);
    // console.log("myFriendRequests", myFriendRequests);
  
    if (!all_attended || !sentChatRequests || !myFriendRequests) {
      setLoading(true); // Keep loading state until data is available
      return;
    }
  
    const matchingAttendees = getMatchingAttendees(all_attended, myFriendRequests);
   //remove all accepted or declined

  //  console.log("matching attendees: ", matchingAttendees)
    const filteredUsers = matchingAttendees.filter(request => request.status !== "accepted" && request.status !== "declined");

   
    setFoundUsers(filteredUsers);
    setLoading(false);
  
  }, [all_attended, sentChatRequests, myFriendRequests]);
  
  // Function to open the modal and show user details
  const showUserDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Function to close the modal
  const handleCancelModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  
  if (loading) return <p>Loading, please wait...</p>;


  return (
    <div className="user_details_bar">
      <div className="current-user-section">
        <Avatar className="current-user-details" src={user.userImage} alt="Profile" size="large" />
        <div className="cu-text">
          <p className="cu-username no-type">{user.userName}</p>
          <p className="cu_user_email no-type">{user.userEmail}</p>
          <p className="cu_user_job no-type">{user.job}</p>
        </div>
      </div>

      <div className="collapse-me">
        <Divider orientation="left">Friend Requests</Divider>
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
          defaultActiveKey={["1"]}
        />
      </div>

      <Chat/>

      {selectedUser && (
        <Modal title="User Details" open={modalVisible} onCancel={handleCancelModal} footer={null}>
          <div className="modal-content-usb">
            <Avatar className="user-details-img" src={selectedUser.userImage} size={64} />
            <div className="model-inner-content">
              <p className="user-details-name">
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p className="user-details-email">
                <strong>Email:</strong> {selectedUser.userEmail}
              </p>
              <p className="user-details-job">
                <strong>Job:</strong> {selectedUser.job}
              </p>
              <p className="user-details-job">
                <strong>About Me:</strong> {selectedUser.bio || "no bio yet"}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserDetailsBar;
