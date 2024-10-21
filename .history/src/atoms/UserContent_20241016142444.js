import React, { useContext, useEffect, useState } from "react";
import "./skipdash.css";
import profileImg from "../assets/bree.png"; // Replace with your local image
import postImg from "../assets/cee.png"; // Replace with your local image
import Logo from "../assets/logo.png";
import { Input, Avatar, Button } from "antd";
import { FileImageFilled } from "@ant-design/icons";
import { FileAddFilled } from "@ant-design/icons";
import "./userContent.css";
import CreatePostDialog from "./CreatePostDialog"; // Import CreatePostDialog
import { AuthContext } from "../logic/AuthContext";
import CommentActions from "./CommentActions";
import { VideoCameraFilled, DeleteFilled } from "@ant-design/icons";

function UserContent({ user, events }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [eventId, setUserEventId] = useState(null);
  const { posts, deletePost ,fetchPosts, loading, error } = useContext(AuthContext); // Use the context to access posts

  useEffect(() => {
    const userEvent = events.find((event) =>
      event.attendees.some((attendee) => attendee.userEmail === user.userEmail)
    );
    setUserEventId(userEvent?.eventId);
  }, [events, user.userEmail] );



  useEffect(() => {
    if (user?.userId && eventId) {
      fetchPosts(user?.userId, eventId); // Fetch posts whenever userId or eventId changes
    }
  }, [user?.userId, eventId, fetchPosts]);
  

  if (loading) return <p>Loading posts...</p>;
  if (error) return   <div className="make-post-details">
            <img src={user.userImage} alt="Story" />
            <Input
              className="make-post-input"
              placeholder="What's on your mind"
              onClick={showModal} // This triggers the modal to open
            />
          </div>;

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const deletePostFunction =(postId, eventId)=>{
      deletePost(postId, eventId)

  }

  return (
    <div className="user_content">

<div className="stories">
        <div className="story">
          <div className="make-post-details">
            <img src={user.userImage} alt="Story" />
            <Input
              className="make-post-input"
              placeholder="What's on your mind"
              onClick={showModal} // This triggers the modal to open
            />
          </div>
          <div className="make-post-actions">
            <div className="ic_post_area">
              <VideoCameraFilled className="icp_video" />
              <p className="icp_text">Video</p>
            </div>
            <div className="ic_post_area">
              <FileImageFilled className="icp_image" />
              <p className="icp_text">Image/Photo</p>
            </div>
            <div className="ic_post_area">
              <FileAddFilled className="icp_doc" />
              <p className="icp_text">Document</p>
            </div>
          </div>
        </div>
        {/* Add more stories as needed */}
      </div>

     <div className="posts-container">
    {posts.length === 0 ? (
      <p>No posts available for this event.</p>
    ) : (
      posts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort posts by most recent first
      .map((post) => (
        <div className="post" key={post.postId}>
          <div className="post_details">
            <img src={post.userImage} className="post-image-2" size="large" alt="Groups" />
            <div className="post_details_text">
            <div className="delete-options">
                  <h3 className="post_username">{post.userName}</h3>
                  {post.userId === user.userId && (
                    <DeleteFilled color="red" className="delete_btn" onClick={() => deletePostFunction(post.postId, eventId)}/>
                 
                 )}
                </div>
              
              <span className="post_date">{new Date(post.createdAt).toLocaleString()}</span>
              <p className="post_desc">{post.content}</p>
            </div>
          </div>

          {post.mediaUrl && <image className="post-image" src={post.mediaUrl} alt="Post" />}
          <div className="comment-section">
        <CommentActions user={user} userName={user.username} userImage={user?.userImage} eventId={eventId} post={post}/>
          </div>
        </div>
      ))
    )}
  </div>    

      <CreatePostDialog
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        user={user}
        eventId={eventId}
      />


    </div>
 
  );
}

export default UserContent;