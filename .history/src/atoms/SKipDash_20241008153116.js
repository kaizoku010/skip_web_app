import React from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import postImg from "../assets/cee.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input } from "antd";
import { BellFilled } from "@ant-design/icons";
import { WechatOutlined } from "@ant-design/icons";
import { AppstoreFilled } from "@ant-design/icons";
import { Collapse, Divider } from "antd";

function SKipDash() {
  const postTest =
    "Signature Pictures specializes in capturing the essence of your events through professional photography and videography services.";

  return (
    <div className="facebook-dashboard">
      {/* Header */}
      <div className="header2">
        <div className="header-left">
          <img src={Logo} alt="skip Logo" className="logo" />
          <Input
            type="text"
            className="search_input"
            placeholder="Search Skip"
          />
        </div>
        <div className="header-center">
          {/* Center area (optional for icons) */}
        </div>
        <div className="header-right space-me">
          <div className="header_ics">
            <AppstoreFilled className="ticket-icon shadeMe" />
            <WechatOutlined className="chat-bubble shadeMe" />
            <BellFilled className="notification-bell shadeMe" />
          </div>

          <img src={profileImg} alt="User" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
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
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Stories */}
          <div className="stories">
            <div className="story">
              <div className="make-post-details">
                <img src={profileImg} alt="Story" />
                <Input
                  className="make-post-input"
                  placeholder="whats on your mind"
                />
              </div>
              <div className="make-post-actions">
                <p>Video</p>
                <p>Image/photo</p>
                <p>Document</p>
              </div>
            </div>
            {/* Add more stories as needed */}
          </div>

          {/* Posts */}
          <div className="post">
            <div className="post_details">
              <img className="post_user_image" src={profileImg} alt="Groups" />
              <div className="post_details_text">
                <h3 className="post_username">Kitiibwa Myst Baker</h3>
                <span className="post_date">October 4 at 12:31 PM</span>
                <p className="post_desc">{postTest}</p>
              </div>
            </div>

            <img className="post-image" src={postImg} alt="Post" />
            <div className="comment-section">
              <p className="cs-text">Like</p>
              <p className="cs-text">Comment</p>
              <p className="cs-text">Share</p>
            </div>
          </div>
          {/* Add more posts as needed */}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <ul>
            <li>
              <img src={profileImg} alt="Friend Request" /> Sarah Andersson
            </li>
            <li>
              <img src={profileImg} alt="Birthdays" /> Birthdays
            </li>
            <li>
              <img src={profileImg} alt="Contacts" /> Contacts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SKipDash;
