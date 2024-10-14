import React, { useState } from "react";
import { Modal, Input, Button, Avatar, Progress } from "antd";
import { VideoCameraFilled, FileImageFilled, SmileOutlined, GifOutlined, UserAddOutlined, CloseOutlined } from "@ant-design/icons";
import "./userContent.css";
import axios from "axios";

const CreatePostDialog = ({
  user,
  eventId,
  isModalVisible,
  handleCancel,
  setPosts,
  postContent,
  setPostContent,
  postMedia,
  setPostMedia,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle post submission and file upload logic
  const handlePostSubmit = async () => {
    if (!postContent) {
      alert("Post content is required!");
      return;
    }

    setIsUploading(true); // Show the progress bar

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("userId", user.userId);
    if (postMedia) {
      formData.append("media", postMedia); // Add media if available
    }

    try {
      const response = await axios.post(`/create_post/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); // Update the progress
        },
      });

      console.log("Post created successfully:", response.data);
      setPosts([response.data, ...setPosts]); // Add new post to the top
      setPostContent(""); // Clear the input
      setPostMedia(null); // Clear the media
    } catch (error) {
      console.error("Error submitting post", error);
    } finally {
      setIsUploading(false); // Hide the progress bar when done
      setUploadProgress(0); // Reset progress
      handleCancel(); // Close the modal after submitting
    }
  };

  return (
    <Modal
      title="Create Post"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<CloseOutlined />}
    >
      <div className="create-post-header">
        <Avatar src={user.userImage} size="large" />
        <div className="create-post-user-details">
          <h3>{user.name}</h3>
          <Button type="text" icon={<UserAddOutlined />}>Friends</Button>
        </div>
      </div>

      {/* Post content input */}
      <Input.TextArea
        rows={4}
        placeholder={`What's on your mind, ${user.name}?`}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      {/* Media attachment icons */}
      <div className="create-post-actions">
        <Button icon={<FileImageFilled />}>Photo/Video</Button>
        <Button icon={<VideoCameraFilled />}>Live Video</Button>
        <Button icon={<SmileOutlined />}>Feeling/Activity</Button>
        <Button icon={<GifOutlined />}>GIF</Button>
      </div>

      {/* Submit and Cancel buttons */}
      <div className="create-post-footer">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" onClick={handlePostSubmit}>
          Post
        </Button>
      </div>

      {/* Progress bar displayed only when uploading */}
      {isUploading && (
        <div className="upload-progress">
          <Progress percent={uploadProgress} status={uploadProgress === 100 ? "success" : "active"} />
        </div>
      )}
    </Modal>
  );
};

export default CreatePostDialog;
