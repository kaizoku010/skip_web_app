import React, { useContext, useEffect, useState,useCallback } from "react";
import "./skipdash.css";
import profileImg from "../assets/pp.jpg";
import { Collapse, Divider, Avatar, Button, Modal } from "antd";
import { AuthContext } from "../logic/AuthContext";
import "./usdb.css"

function UserDetailsBar() {
  const [foundUsers, setFoundUsers] = useState();
  const { user, sentChatRequests,
    all_attended,
    friendRequests,
    getMatchingAttendees,
     declineRequest,
    acceptRequest,} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    // console.log("All attendees:", all_attended);
  }, [all_attended]);

  useEffect(() => {
    if (all_attended && sentChatRequests) {
      const matchingAttendees = getMatchingAttendees(all_attended, sentChatRequests);
      setFoundUsers(matchingAttendees)
    }
  }, [all_attended, sentChatRequests]);

  console.log('Sent request:', sentChatRequests);

  // console.log('main Users:',user);

  useEffect(() => {
    if (all_attended && sentChatRequests) {
      setLoading(false); // Set loading to false once data is available
      const matchingAttendees = getMatchingAttendees(all_attended, sentChatRequests);
      setFoundUsers(matchingAttendees);
    }
  }, [all_attended, sentChatRequests]);
  
  if (loading) return <p>Loading, please wait...</p>;


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

// console.log("found users: ", foundUsers)

return (
    <div className="user_details_bar">
      <div className="current-user-section">
        <Avatar
          className="current-user-details"
          src={user.userImage}
          alt="Profile"
          size="large"
        />
        <div className="cu-text">
          <p className="cu-username no-type">{user.userName}</p>
          <p className="cu_user_email no-type">{user.userEmail}</p>
          <p className="cu_user_job no-type">{user.job}</p>
        </div>
      </div>
      <div className="collapse-me">
        <Divider orientation="left">Sent Chat Requests</Divider>
        <Collapse
          items={[
            {
              key: "1",
              label: "Show Full Of Recieved Friend Requests",
              children: (
                <div>
                  {foundUsers?.length > 0 ? (
                    foundUsers.map((request) => (
<div key={request.id} className="current-user-section ibra" onClick={() => showUserDetails(request)}>
<img
                          className="current-user-details"
                          src={request.userImage || profileImg} // Use profile image if available
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">{request.username}</p>
                          <p className="cu_user_email no-type">
                            {request.userEmail}
                          </p>
                          <p className="cu_user_job no-type">
                            {request.job}
                          </p>

                          {/* {request.senderId === user.userEmail && ( */}
          <div className="udb-actions">
            <Button className="udb-btn udb-btn-approve"
                              onClick={() => acceptRequest(request.id)}

            >Approve</Button>
            <Button className="udb-btn udb-btn-decline"
                              onClick={() => declineRequest(request.id)}

            >Decline</Button>
          </div>
        {/* )} */}
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
      <div className="collapse-me">
        <Divider orientation="left">Friend List</Divider>
        <Collapse
          items={[
            {
              key: "1",
              label: "Click to show a list of your friends",
              children: (
                <div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
        />
      </div>
      <div className="collapse-me">
        <Divider orientation="left">Chat List</Divider>
        <Collapse
          items={[
            {
              key: "1",
              label: "Click to show a list of your friends",
              children: (
                <div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                  <div className="current-user-section">
                    <img
                      className="current-user-details"
                      src={profileImg}
                      alt="Profile"
                    />
                    <div className="cu-text">
                      <p className="cu-username no-type">Muneza Dixon</p>
                      <p className="cu_user_email no-type">
                        dixonvstheworld@gmail.com
                      </p>
                      <p className="cu_user_job no-type">Moxie5 Agency</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
        />
      </div>

      {selectedUser && (
        <Modal
          title="User Details"
          open={modalVisible}
          onCancel={handleCancelModal}
          footer={null}
        >
          <div className="modal-content-usb">
            <Avatar className="user-details-img" src={selectedUser.userImage} size={64} />
            <div className="model-inner-content">
            <p className="user-details-name"><strong>Username:</strong> {selectedUser.username}</p>
            <p className="user-details-email"><strong>Email:</strong> {selectedUser.userEmail}</p>
            <p className="user-details-job"><strong>Job:</strong> {selectedUser.job}</p>
            <p className="user-details-job"><strong>About Me:</strong> {selectedUser.bio || "no bio yet"}</p>

            </div>
  
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserDetailsBar;
