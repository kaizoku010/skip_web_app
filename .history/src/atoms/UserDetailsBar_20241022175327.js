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
  
  // New loading state for each request
  const [loadingRequests, setLoadingRequests] = useState({});

  useEffect(() => {
    if (!all_attended || !sentChatRequests || !myFriendRequests) {
      setLoading(true);
      return;
    }

    const matchingAttendees = getMatchingAttendees(all_attended, myFriendRequests);
    const filteredUsers = matchingAttendees.filter(request => request.status !== "accepted" && request.status !== "declined");
    
    setFoundUsers(filteredUsers);
    setLoading(false);
  }, [all_attended, sentChatRequests, myFriendRequests]);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleAcceptRequest = async (requestId) => {
    // Set loading for the specific request
    setLoadingRequests(prev => ({ ...prev, [requestId]: true }));

    try {
      await acceptRequest(requestId); // Assume this returns a promise
      // Optionally, handle success here (like showing a message)
    } catch (error) {
      console.error("Failed to accept request:", error);
      // Optionally, handle failure here (like showing an error message)
    } finally {
      // Reset the loading state for the specific request
      setLoadingRequests(prev => ({ ...prev, [requestId]: false }));
    }
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
                      <div key={request.id} className="current-user-section ibra" onClick={() => showUserDetails(request)}>
                        <img className="current-user-details" src={request.userImage || profileImg} alt="Profile" />
                        <div className="cu-text">
                          <p className="cu-username no-type">{request.username}</p>
                          <p className="cu_user_email no-type">{request.userEmail}</p>
                          <p style={{ fontSize: "smaller" }} className="cu_user_job no-type">
                            works at: {request.job}
                          </p>
                          <div className="udb-actions">
                            <Button 
                              className="udb-btn" 
                              type="primary" 
                              onClick={() => handleAcceptRequest(request.requestId)} 
                              loading={loadingRequests[request.requestId] || false} // Show spinner if loading
                            >
                              Approve
                            </Button>
                            <Button 
                              className="udb-btn udb-btn-decline" 
                              type="danger" 
                              onClick={() => declineRequest(request.requestId)}
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No pending friend requests.</p>
                  )}
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
        />
      </div>

      <Chat />

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
              <p className="user-details-bio">
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
