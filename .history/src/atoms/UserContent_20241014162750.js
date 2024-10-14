import React, { useContext, useEffect, useState } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import postImg from "../assets/cee.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input, Avatar } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import { FileImageFilled } from "@ant-design/icons";
import { FileAddFilled } from "@ant-design/icons";
import "./userContent.css";
import CreatePostDialog from "./CreatePostDialog"; // Import CreatePostDialog
import { AuthContext } from "../logic/AuthContext";

function UserContent({ user, events }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [eventId, setUserEventId] = useState(null);
  const { posts, fetchPosts, loading, error } = useContext(AuthContext); // Use the context to access posts

  useEffect(() => {
    const userEvent = events.find((event) =>
      event.attendees.some((attendee) => attendee.userEmail === user.userEmail)
    );
    setUserEventId(userEvent?.eventId);
  }, [events, user.userEmail] );



  useEffect(() => {
    fetchPosts(user?.userId, eventId); // Fetch posts whenever the component is mounted or context changes
  }, [fetchPosts]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;


  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <div>
      
    </div>
    <div className="posts-container">
    {posts.length === 0 ? (
      <p>No posts available for this event.</p>
    ) : (
      posts.map((post) => (
        <div className="post" key={post.postId}>
          <div className="post_details">
            <Avatar src={profileImg} size="large" alt="Groups" />
            <div className="post_details_text">
              <h3 className="post_username">{post.userName}</h3>
              <span className="post_date">{new Date(post.createdAt).toLocaleString()}</span>
              <p className="post_desc">{post.content}</p>
            </div>
          </div>

          {post.mediaUrl && <img className="post-image" src={post.mediaUrl} alt="Post" />}
          <div className="comment-section">
            <p className="cs-text">Like</p>
            <p className="cs-text">Comment</p>
            <p className="cs-text">Share</p>
          </div>
        </div>
      ))
    )}
  </div>
  );
}

export default UserContent;
