import React, { useState } from "react";
import { Modal, Input, Button, Progress } from "antd";
import { VideoCameraFilled, FileFilled, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import "./userContent.css";
import "./pop_up_post.css";

const CreatePostDialog = ({ isModalVisible, handleCancel, user, eventId }) => {
  const [postContent, setPostContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handlePostSubmit = async () => {
    if (!postContent) {
      alert("Post content is required!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("userId", user.userId);
    formData.append("userName", user.userName);
    formData.append("userImage", user.userImage);

    if (mediaFile) {
      formData.append("mediaUrl", mediaFile);
    }

    try {
      const response = await axios.post(
        `https://skip-api-1gup.onrender.com/create_post/${eventId}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log("Post created successfully:", response.data);
      setPostContent("");
      setMediaFile(null);
      setMediaPreview(null);
    } catch (error) {
      console.error("Error submitting post", error.response?.data || error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      handleCancel();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);

    if (file) {
      setMediaPreview(URL.createObjectURL(file)); // Create object URL for preview
    } else {
      setMediaPreview(null);
    }
  };

  return (
    <Modal
      title="Create Post"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<CloseOutlined />}
    >
      <Input.TextArea
        rows={4}
        style={{ marginBottom: "1rem" }}
        placeholder={`What's on your mind, ${user?.userName}?`}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      <div className="create-post-actions">
        <label s>
            Photo/Video
            <input
              type="file"
              accept="image/*,video/*" // Ensure you can select images and videos
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the input
            />
        </label>
        <Button icon={<FileFilled />}>Document</Button>
      </div>

      {mediaPreview && (
        <div className="media-preview">
          <h4>Preview:</h4>
          {mediaFile && mediaFile.type.startsWith('video/') ? (
            <video controls width="100%">
              <source src={mediaPreview} type={mediaFile.type} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={mediaPreview} alt="Media preview" style={{ width: "100%", marginTop: "1rem" }} />
          )}
        </div>
      )}

      <div className="create-post-footer">
        <Button type="primary" onClick={handlePostSubmit}>
          Post
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>

      {isUploading && (
        <div className="upload-progress">
          <Progress
            percent={uploadProgress}
            status={uploadProgress === 100 ? "success" : "active"}
          />
        </div>
      )}
    </Modal>
  );
};

export default CreatePostDialog;
