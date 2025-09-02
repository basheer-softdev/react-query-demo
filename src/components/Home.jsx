import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const API_URL = "http://localhost:3001/posts/";

const fetchPosts = async () => {
  const { data } = await axios(API_URL);
  return data;
};

const createPost = async () => {
  const { data } = await axios.post(API_URL, newPost);
};

const Home = () => {
  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isError) {
    return <div>Error Fetching data...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <h3>Create Read Update & Delete</h3>
      <div className="post-list">
        {posts.map((post) => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
