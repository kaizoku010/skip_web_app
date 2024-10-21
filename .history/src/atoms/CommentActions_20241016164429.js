import React, { useContext, useEffect, useState } from 'react';
import "./comment_actions.css";
import axios from 'axios';
import { AuthContext } from "../logic/AuthContext";
import { Avatar, Button, Progress, message } from "antd";
import { Input, Space } from 'antd';

function CommentActions({ post, eventId, userImage }) {
  const { user } = useContext(AuthContext); // Assuming AuthContext is providing user data
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]); // Ensure comments is always an array
  const [likes, setLikes] = useState(post?.likes?.length || 0); // Initialize likes count
  const [liked, setLiked] = useState(post?.likes?.includes(user?.userId)); // Check if the post is already liked by the user
  const [loading, setLoading] = useState(false); // Loading state for saving comment
  const [progress, setProgress] = useState(0); // Progress bar state
  const [commentCount, setCommentCount] = useState(0); // Initialize comment count

  const userName = user.userName;

  // Function to handle adding a comment
  const handleAddComment = async () => {
    if (!commentText) return;

    setLoading(true); // Start loading
    setProgress(30);  // Initial progress

    try {
      await axios.post(`https://skip-api-1gup.onrender.com/add_comment/${eventId}/${post.postId}`, {
        userName: userName,
        userImage: userImage,
        comment: commentText,
      });

      setProgress(100); // Complete progress
      message.success('Comment added successfully'); // Success message
      setCommentText(''); // Clear input
      fetchComments();    // Re-fetch comments to update the list
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);  // Stop loading
      setProgress(0);     // Reset progress
    }
  };

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://skip-api-1gup.onrender.com/get_comments/${eventId}/${post.postId}`);
      const fetchedComments = Array.isArray(response.data) ? response.data : [];
      setComments(fetchedComments); // Set the comments state
      setCommentCount(fetchedComments.length); // Set the comment count
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Function to like or unlike the post
  const handleLikePost = async () => {
    try {
      await axios.post(`https://skip-api-1gup.onrender.com/like_post/${eventId}/${post.postId}`, { userId: user.userId });
      setLiked(!liked); // Toggle liked state
      setLikes(liked ? likes - 1 : likes + 1); // Update likes count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Fetch comments when the component mounts (immediately when post is loaded)
  useEffect(() => {
    fetchComments(); // Fetch comments as soon as the post is rendered
  }, [post]);

  return (
    <div className='post-actions'>
      <div className='action-buttons'>
        <button className='comment-btn' onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Hide Comments' : `${commentCount} Comment${commentCount !== 1 ? 's' : ''}`}
        </button>
        <button className='like-unlike' onClick={handleLikePost}>
          {liked ? 'Unlike' : 'Like'}
        </button>
        <span className='like_action'>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
      </div>

      {showComments && (
        <div>
          <div className='comment-style'>
            {comments?.map(comment => (
              <div className='comment-content' key={comment.commentId}>
                <Avatar src={comment.userImage} alt="User" />
                <div className='comment-text-content'>
                  <p className='ctc-text ctc-name'>{comment.userName}</p>
                  <p className='ctc-text ctc-date'>{new Date(comment.createdAt).toLocaleString()}</p>
                  <p className='ctc-text'>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='comment-btm-actions'>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="Write your comment here..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                disabled={loading} // Disable input while loading
              />
              <Button
                className='add-comment-btn'
                onClick={handleAddComment}
                type="primary"
                loading={loading} // Show loading state on button
              >
                Add Comment
              </Button>
            </Space.Compact>
          </div>

          {loading && (
            <Progress percent={progress} status={progress < 100 ? 'active' : 'success'} />
          )}
        </div>
      )}
    </div>
  );
}

export default CommentActions;
