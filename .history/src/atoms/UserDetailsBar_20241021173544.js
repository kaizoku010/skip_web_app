import React, { useContext, useEffect, useState,useCallback } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png";
import { Collapse, Divider, Avatar } from "antd";
import { AuthContext } from "../logic/AuthContext";

function UserDetailsBar() {

  const { user, sentChatRequests, getAllAttendees,all_attended} = useContext(AuthContext);

  useEffect(() => {
    console.log("All attendees:", all_attended);
  }, [all_attended]);

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
              label: "Click to show full list",
              children: (
                <div>
                  {sentChatRequests.length > 0 ? (
                    sentChatRequests.map((request) => (
                      <div key={request.id} className="current-user-section">
                        <img
                          className="current-user-details"
                          src={request.imageUrl || profileImg} // Use profile image if available
                          alt="Profile"
                        />
                        <div className="cu-text">
                          <p className="cu-username no-type">{request.name}</p>
                          <p className="cu_user_email no-type">
                            {request.email}
                          </p>
                          <p className="cu_user_job no-type">
                            {request.company}
                          </p>
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
    </div>
  );
}

export default UserDetailsBar;
