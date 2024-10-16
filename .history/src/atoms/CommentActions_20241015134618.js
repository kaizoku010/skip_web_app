import React, { useContext, useEffect, useState } from 'react'
import "./comment_actions.css"
import axios from 'axios';
import { AuthContext } from "../logic/AuthContext";
import {Avatar, Button } from "antd";
import { Cascader, Input, Select, Space } from 'antd';
import { SendOutlined   } from '@ant-design/icons';


function CommentActions({ post, eventId, userId, userImage, userName}){
    const { user, fetchPosts } = useContext(AuthContext); // Assuming AuthContext is providing user data and fetchPosts
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]); // Ensure comments is always an array
    const [likes, setLikes] = useState(post?.likes?.length || 0); // Initialize likes count
    const [liked, setLiked] = useState(post?.likes?.includes(user?.userId)); // Check if the post is already liked by the user
  
        // Function to handle adding a comment
        const handleAddComment = async () => {
          if (!commentText) return;
      
          try {
            await axios.post(`https://skip-api-1gup.onrender.com/add_comment/${eventId}/${post.postId}`, {
              userId: userId,
              userName: userName,
              userImage: userImage,
              comment: commentText,
            });
            setCommentText(''); // Clear input
            fetchComments(); // Re-fetch comments to update the list
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        };
      
        // Function to fetch comments
        const fetchComments = async () => {
          try {
            const response = await axios.get(`https://skip-api-1gup.onrender.com/get_comments/${eventId}/${post.postId}`);
            setComments(Array.isArray(response.data) ? response.data : []);
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
      
        // Fetch comments when the comment section is opened
        useEffect(() => {
          if (showComments) fetchComments();
        }, [showComments]);
      

        return (
          <div className='post-actions'>
            {/* <h3>{post.content}</h3> */}
            {/* <img src={post.mediaUrl} alt="Post Media" /> */}
            <div className='action-buttons'>
              <button className='comment-btn' onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Comment'}
              </button>
              <button className='like-unlike' onClick={handleLikePost}>{liked ? 'Unlike' : 'Like'}</button>
              <span className='like_action'>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
      
            {showComments && (
              <div>
                <div>
                  {comments?.map(comment => (
                    <div key={comment.commentId}>
                      <img src={comment.userImage} alt="User" />
                      <p><strong>{comment.userName}</strong>: {comment.comment}</p>
                    </div>
                  ))}
                </div>
                <div>
                <Input addonAfter={<SendOutlined   />} defaultValue="mysite" />

                {/* <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button> */}
              </div>
            )}
          </div>
        );
      };
      

export default CommentActions