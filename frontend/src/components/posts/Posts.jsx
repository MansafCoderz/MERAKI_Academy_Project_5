import React, { useEffect, useState } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/reducers/slicePosts";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Input, Button, List, Avatar, message } from "antd";
import { SearchOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Search from "../search/Search";
=======
import SearchBar from "../search/Search";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const Posts = () => {
  const userId = localStorage.getItem('user_id')
  const [addPost , setaddPost] = useState({})
  const postInfo = {image : addPost.image||null , body : addPost.body|| null ,video:addPost.video||null  }
  const navigate = useNavigate();
>>>>>>> d4c6d30e2a42e3e7f64967fd81bf4343109d9adb

const Posts = () => {
  const [addPost, setAddPost] = useState({});
  const postInfo = { image: addPost.image || null, body: addPost.body || null, video: addPost.video || null };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
     
        
        dispatch(setPosts(res.data.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch, token]);

  // Handle save post
  const handleAddSave = (id) => {
    axios
      .post(
        `http://localhost:5000/posts/add&save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        message.success("Post saved successfully!");
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to save post.");
      });
  };

  // Handle adding a new post
  const handleAddPost = () => {
    axios
      .post("http://localhost:5000/posts", postInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        message.success("Post created successfully!");
        setAddPost({}); // Reset the input fields
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to create post.");
      });
  };

  return (
    <div>
      {/* Search Section */}
      <Search token={token} />

      {/* Create Post Section */}
      <div className="createPost">
        <Input.TextArea
          placeholder="What's on your mind?"
          value={addPost.body || ""}
          onChange={(e) => setAddPost({ ...addPost, body: e.target.value })}
          rows={3}
          className="create-post-input"
        />
        <Button type="primary" onClick={handleAddPost}>
          Post
        </Button>
      </div>

      {/* Display Posts */}
      <div className="posts-section">
        {posts?.map((post, index) => (
          <div key={index} className="post">
            {post.profile_image ? (
              <Avatar src={post.profile_image} className="post-avatar" />
            ) : (
              <Avatar icon={<UserOutlined />} className="post-avatar" />
            )}
            <div className="post-content">
              <h3>{post.user_name}</h3>
              <p>{post.body}</p>
              <div className="post-actions">
                <Button type="link" onClick={() => handleAddSave(post.post_id)}>
                  Save Post
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    localStorage.setItem("postId", post.post_id);
                    navigate("./comments");
                  }}
                >
                  Comments
                </Button>
                <Button type="link">Like</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Help Button */}
      <FloatButton
        className="float-button"
        icon={<QuestionCircleOutlined />}
        type="primary"
      />
    </div>
  );
};

export default Posts;
