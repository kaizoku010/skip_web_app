import React from 'react'
import "./comment_actions.css"

function CommentActions({ post, eventId }) => {
        const { user, fetchPosts } = useContext(AuthContext); // Assuming AuthContext is providing user data and fetchPosts
        const [showComments, setShowComments] = useState(false);
        const [commentText, setCommentText] = useState('');
        const [comments, setComments] = useState([]);
        const [likes, setLikes] = useState(post.likes.length);
        const [liked, setLiked] = useState(post.likes.includes(user.userId)); // Check if the post is already liked by the user
      
        // Function to handle adding a comment
        const handleAddComment = async () => {
          if (!commentText) return;
      
          try {
            await axios.post(`https://skip-api-1gup.onrender.com/add_comment/${eventId}/${post.postId}`, {
              userId: user.userId,
              userName: user.userName,
              userImage: user.userImage,
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
            setComments(response.data);
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
          <div>
            <h3>{post.content}</h3>
            <img src={post.mediaUrl} alt="Post Media" />
            <div>
              <button onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Comment'}
              </button>
              <button onClick={handleLikePost}>{liked ? 'Unlike' : 'Like'}</button>
              <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
      
            {showComments && (
              <div>
                <div>
                  {comments.map(comment => (
                    <div key={comment.commentId}>
                      <img src={comment.userImage} alt="User" />
                      <p><strong>{comment.userName}</strong>: {comment.comment}</p>
                    </div>
                  ))}
                </div>
      
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
              </div>
            )}
          </div>
        );
      };
      

export default CommentActions