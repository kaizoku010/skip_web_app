import React, { useState } from "react";
import { Modal, Input, Button, Avatar } from "antd";
import { VideoCameraFilled, FileImageFilled, SmileOutlined, GifOutlined, UserAddOutlined, CloseOutlined } from "@ant-design/icons";
import "./userContent.css"; // Add relevant styles

const CreatePostDialog = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postContent, setPostContent] = useState("");

  // Show the modal when the user clicks the input field
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle post submission and closing the modal
  const handlePostSubmit = () => {
    // Handle the post creation logic
    console.log("Post content: ", postContent);

    // Reset content and close modal
    setPostContent("");
    setIsModalVisible(false);
  };

  // Close modal without posting
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Main post input field that triggers the modal */}
      <div className="main-post-input" onClick={showModal}>
        <Input placeholder={`What's on your mind, ${user.name}?`} />
      </div>

      {/* Modal for creating post */}
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
          {/* Add more action buttons as needed */}
        </div>

        {/* Submit and Cancel buttons */}
        <div className="create-post-footer">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handlePostSubmit}>
            Post
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostDialog;
