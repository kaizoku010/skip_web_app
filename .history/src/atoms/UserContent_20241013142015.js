import React, { useState } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import postImg from "../assets/cee.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input } from "antd";
import { VideoCameraFilled  } from "@ant-design/icons";
import { FileImageFilled   } from "@ant-design/icons";
import { FileAddFilled  } from "@ant-design/icons";
import "./userContent.css"
import CreatePostDialog from "./CreatePostDialog";  // Import CreatePostDialog


function UserContent({user, eventId}) {

    const postTest =
    "Signature Pictures specializes in capturing the essence of your events through professional photography and videography services.";
  // Refs for file inputs

// Refs for file inputs
// const imageInputRef = React.useRef(null);
// const videoInputRef = React.useRef(null);
// const documentInputRef = React.useRef(null);



    return (
    <div className="user_content">
          {/* Stories */}
          <div className="stories">
            <div className="story">
              <div className="make-post-details">
                <img src={user.userImage} alt="Story" />
                <Input
                  className="make-post-input"
                  placeholder="whats on your mind"
                  onClick={() => showModal()} // This triggers the modal to open

                />
              </div>
              <div className="make-post-actions">
              <div className="ic_post_area">
              <VideoCameraFilled className="icp_video"/>
                  <p className="icp_text">Video</p>
                </div>
                <div className="ic_post_area" >
                <FileImageFilled  className="icp_image"/>
                  <p className="icp_text">Image/Photo</p>
                </div>
                <div className="ic_post_area" >
                <FileAddFilled  className="icp_doc"/>
                  <p className="icp_text">Document</p>
                </div>
             
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

      {/* Trigger the CreatePostDialog modal */}
      <CreatePostDialog user={user} eventId={eventId} />
        </div>
  )
}

export default UserContent