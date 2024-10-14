import React from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import { Collapse, Divider } from "antd";

function UserDetailsBar() {
  return (
<div className="left-sidebar">
          <div className="current-user-section">
            <img
              className="current-user-details"
              src={profileImg}
              alt="Profile"
            />
            <div className="cu-text">
              <p className="cu-username no-type">Muneza Dixon</p>
              <p className="cu_user_email no-type">dixonvstheworld@gmail.com</p>
              <p className="cu_user_job no-type">Moxie5 Agency</p>
            </div>
          </div>

          {/* <div className="friend-list">
            <h4 className="friendlist-heading"></h4>
          </div> */}
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

              defaultActiveKey={['1']} 
            />
          </div>
        </div>  )
}

export default UserDetailsBar