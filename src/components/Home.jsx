import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import "../Crud.css";

const API_URL = "http://localhost:3001/posts/";

const fetchPosts = async () => {
  const { data } = await axios(API_URL);
  return data;
};

const createPost = async (newPost) => {
  const { data } = await axios.post(API_URL, newPost);
  return data;
};

const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const updatePost = async (updatePostData) => {
  const { data } = await axios.put(
    `${API_URL}/${updatePostData.id}`,
    updatePostData
  );
  return data;
};

const Home = () => {
  const queryClient = useQueryClient();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [editPost, setEditPost] = useState(null);

  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPostTitle("");
      setNewPostBody("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditPost(null);
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ title: newPostTitle, body: newPostBody });
  };

  const handleDelete = (id) => {
    if (confirm("Are you want to delete?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = () => {
    updateMutation.mutate(editPost);
  };

  if (isError) {
    return <div>Error Fetching data...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <h1>Create Read Update & Delete</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <input
          type="text"
          placeholder="Post Title"
          onChange={(e) => setNewPostTitle(e.target.value)}
          value={newPostTitle}
        />
        <input
          type="text"
          placeholder="Post Body"
          onChange={(e) => setNewPostBody(e.target.value)}
          value={newPostBody}
        />
        <button type="submit">Create Post</button>
      </form>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post-item" key={post.id}>
            {editPost?.id === post.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  placeholder="Post Title"
                  value={editPost.title}
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Post Body"
                  value={editPost.body}
                  onChange={(e) =>
                    setEditPost({ ...editPost, body: e.target.value })
                  }
                />
                <button onClick={handleUpdate}>Save</button>
                <button className="cancel" onClick={() => setEditPost(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="actions">
                  <button onClick={() => setEditPost(post)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
