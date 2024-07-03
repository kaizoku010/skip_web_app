import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import moment from "moment";
import { dynamoDB } from "../Operations/awsexports"; // Import DynamoDB client
import { v4 as uuidv4 } from 'uuid'; // For generating unique message IDs

const PostDetails = ({ route }) => {
  const { postId, userName, image } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(0);

  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Function to fetch post details from DynamoDB
  const fetchPostDetails = async () => {
    try {
      const params = {
        TableName: 'all_posts', // Replace with your DynamoDB table name
        Key: {
          postId: postId
        }, 
        StreamSpecification: {
          StreamEnabled: true,
          StreamViewType: 'NEW_AND_OLD_IMAGES'
        }
      };
      const postDoc = await dynamoDB.get(params).promise();
      if (postDoc.Item) {
        setPost(postDoc.Item);
      } else {
        console.error("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  // Function to fetch comments for the post from DynamoDB
  const fetchComments = async () => {
    try {
      const params = {
        TableName: 'comments', 
        KeyConditionExpression: 'postId = :postId',
        ExpressionAttributeValues: {
          ':postId': postId
        }
      };
      const commentsData = await dynamoDB.query(params).promise();
      const fetchedComments = commentsData.Items.map(item => ({
        ...item,
        created_at: new Date(item.created_at) // Convert timestamp to Date object
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to handle adding a new comment
  const handleAddComment = async () => {
    try {
      const commentData = {
        postId: postId,
        user_id: userName,
        content: newComment.trim(),
        created_at: new Date().toISOString(),
        userImage: image || "loading....",
        commentId: uuidv4()
      };
      const params = {
        TableName: 'comments', //your DynamoDB table name
        Item: commentData
      };
      await dynamoDB.put(params).promise();
      setNewComment("");
      // Refetch comments to update the view
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
    fetchComments();
  }, []);

  // Debounce function to delay execution of a function
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  // Event listener for scroll events
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  // Function to handle scroll end
  const handleScrollEnd = debounce(() => {
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowBottomNav(true);
  }, 1500); // Adjust debounce delay as needed

  // Function to handle scroll start
  const handleScrollStart = () => {
    setShowBottomNav(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer} // Added this line
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollStart}
        onScrollEndDrag={handleScrollEnd}
      >
        <View style={styles.postContainer}>
          <View style={styles.userInfo}>
            <Image source={{ uri: post?.posterImage }} style={styles.image_user} />
            <Text style={styles.userName}>{post?.userName}</Text>
          </View>
          <Text style={styles.postContent}>{post?.content}</Text>
          {post?.image_url && !loadingMedia && (
            <Image
              source={{ uri: post.image_url }}
              style={styles.postMedia}
              onLoadStart={() => setLoadingMedia(true)}
              onLoad={() => setLoadingMedia(false)}
              onError={() => setLoadingMedia(false)}
            />
          )}
          {loadingMedia && (
            <View style={styles.mediaLoadingContainer}>
              <Text>Loading...</Text>
              <Text>{mediaProgress}%</Text>
            </View>
          )}
          {post?.video && !loadingMedia && (
            <Video
              source={{ uri: post.video }}
              style={styles.videoPlayer}
              controls={true}
              resizeMode="contain"
              onLoadStart={() => setLoadingMedia(true)}
              onLoad={() => setLoadingMedia(false)}
              onError={() => setLoadingMedia(false)}
              onPlaybackStatusUpdate={(status) => {
                if (status.isLoaded && status.durationMillis) {
                  setMediaProgress(
                    Math.round((status.positionMillis / status.durationMillis) * 100)
                  );
                }
              }}
            />
          )}
          {loadingMedia && (
            <View style={styles.mediaLoadingContainer}>
              <Text>Loading...</Text>
              <Text>{mediaProgress}%</Text>
            </View>
          )}
        </View>
        {post?.image && <Image source={{ uri: post.image }} style={styles.image_user3} />}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsHeading}>All Comments</Text>
          {comments.map((comment) => (
            <View key={comment.commentId} style={styles.commentContainer}>
              <View style={styles.flexMe}>
                <Image source={{ uri: comment.userImage }} style={styles.image_user} />
                <View>
                  <Text style={styles.commentUser}>{comment.user_id}</Text>
                  <Text style={styles.commentUser2}>
                    {moment(comment.created_at).fromNow()}
                  </Text>
                </View>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
            multiline
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.postBtn}>
            <Text style={styles.btnText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  scrollContentContainer: {
    flexGrow: 1, // Added this line
  },
  postContainer: {
    marginBottom: 20,
  },
  postContent: {
    fontSize: 16,
    marginTop: "1%",
    marginBottom: 10,
  },
  postMedia: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    paddingBottom: 30
  },
  commentsHeading: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
 
