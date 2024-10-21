import React, { useContext, useEffect, useState } from 'react'
import "./comment_actions.css"
import axios from 'axios';
import { AuthContext } from "../logic/AuthContext";
import {Avatar, Button } from "antd";
import { Cascader, Input, Select, Space } from 'antd';
import { SendOutlined   } from '@ant-design/icons';


function CommentActions({post, eventId, userImage}){
    const { user, fetchPosts } = useContext(AuthContext); // Assuming AuthContext is providing user data and fetchPosts
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]); // Ensure comments is always an array
    const [likes, setLikes] = useState(post?.likes?.length || 0); // Initialize likes count
    const [liked, setLiked] = useState(post?.likes?.includes(user?.userId)); // Check if the post is already liked by the user
    const [commentCount, setCommentCount] = useState(0) 
    // console.log("passed user name:", user.userName)
//    console.log("passed user image url", userImage)

    const userName = user.userName
    
    // Function to handle adding a comment
        const handleAddComment = async () => {
          if (!commentText) return;
      
          try {
            await axios.post(`https://skip-api-1gup.onrender.com/add_comment/${eventId}/${post.postId}`, {
              userName: userName,
              userImage: userImage,
              comment: commentText,
            });
            
            setCommentText(''); // Clear input
            fetchComments();
             // Re-fetch comments to update the list
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        };
      
        // Function to fetch comments
        const fetchComments = async () => {
          try {
            const response = await axios.get(`https://skip-api-1gup.onrender.com/get_comments/${eventId}/${post.postId}`);
            setComments(Array.isArray(response.data) ? response.data : []);
            setCommentCount(response.length())
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
      

        // console.log("comment count-sama:", showComments.length())

        return (
          <div className='post-actions'>
            {/* <h3>{post.content}</h3> */}
            {/* <img src={post.mediaUrl} alt="Post Media" /> */}
            <div className='action-buttons'>
              <button className='comment-btn' onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : ` Comments${comments.length} Comment`}
              </button>
              <button className='like-unlike' onClick={handleLikePost}>{liked ? 'Unlike' : 'Like'}</button>
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
       defaultValue="write your comment here..."
       value={commentText}
       onChange={e => setCommentText(e.target.value)}
       />
      <Button className='add-comment-btn' onClick={handleAddComment} type="primary">Add Comment</Button>
    </Space.Compact>
                </div>

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