import React, { useState } from "react";
import { Modal, Input, Button, Progress } from "antd";
import { VideoCameraFilled,FileFilled, CloseOutlined } from "@ant-design/icons";
import "./userContent.css";
import axios from "axios";
import "./pop_up_post.css"

const CreatePostDialog = ({ isModalVisible, handleCancel, user, eventId }) => {
  const [postContent, setPostContent] = useState("");
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
    // formData.append("content", postContent);
    // formData.append("userId", user.userId);

    // const userId =  user.userId;
    // const content = postContent;


    try {
      // Simulate file upload with progress tracking
      const response = await axios.post(`https://skip-api-1gup.onrender.com/create_post/${eventId}`, {userId, content}, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log("Post created successfully:", response.data);
      setPostContent(""); // Clear the input
    } catch (error) {
      console.error("Error submitting post", error);
    } finally {
      setIsUploading(false); // Hide the progress bar when done
      setUploadProgress(0); // Reset progress
      handleCancel(); // Close the modal
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
 

      {/* Post content input */}
      <Input.TextArea
        rows={4}
        style={{marginBottom:"1rem"}}
        placeholder={`What's on your mind, ${user.userName}?`}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      {/* Media attachment icons */}
      <div className="create-post-actions">
        <Button icon={<VideoCameraFilled />}>Photo/Video</Button>
        <Button icon={<FileFilled />}>Document</Button>
      </div>

      {/* Submit and Cancel buttons */}
      <div className="create-post-footer">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" onClick={handlePostSubmit}>Post</Button>
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
