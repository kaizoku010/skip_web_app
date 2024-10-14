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
import axios from "axios";


function UserContent({user, eventId}) {

 const [postContent, setPostContent] = useState(""); // For storing post text
  const [postMedia, setPostMedia] = useState(null); 
  const [posts, setPosts] = useState([]); // Store the posts
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [uploadProgress, setUploadProgress] = useState(0); // Upload progress


    const postTest =
    "Signature Pictures specializes in capturing the essence of your events through professional photography and videography services.";
  // Refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Open modal when input field is clicked
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  
// Handle post submission
const handlePostSubmit = async () => {
  if (!postContent) {
alert("Post content is required!")
    // message.error("Post content is required!");
    return;
  }

  const formData = new FormData();
  formData.append("content", postContent);
  formData.append("userId", user.userId);
  if (postMedia) {
    formData.append("mediaUrl", postMedia);
  }

  try {
    const response = await axios.post(`/create_post/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // Add new post to the top of the posts array
    setPosts([response.data, ...posts]);
    // Reset input fields
    setPostContent("");
    setPostMedia(null);
    console.log("Post created successfully!");
    // message.success("Post created successfully!");
  } catch (error) {
    console.error("Error submitting post", error);
    // message.error("Failed to create post");
  }
};

// Handle file input change (for image/video/document upload)
const handleFileChange = (e) => {
  setPostMedia(e.target.files[0]);
};

// Trigger the hidden file input click
const handleIconClick = (inputRef) => {
  inputRef.current.click();
};

// Refs for file inputs
const imageInputRef = React.useRef(null);
const videoInputRef = React.useRef(null);
const documentInputRef = React.useRef(null);



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
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className="make-post-actions">
              <div className="ic_post_area" onClick={() => handleIconClick(videoInputRef)}>
              <VideoCameraFilled className="icp_video"/>
                  <p className="icp_text">Video</p>
                </div>
                <div className="ic_post_area" onClick={() => handleIconClick(imageInputRef)}>
                <FileImageFilled  className="icp_image"/>
                  <p className="icp_text">Image/Photo</p>
                </div>
                <div className="ic_post_area" onClick={() => handleIconClick(documentInputRef)}>
                <FileAddFilled  className="icp_doc"/>
                  <p className="icp_text">Document</p>
                </div>
                <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              ref={documentInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
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
  )
}

export default UserContent