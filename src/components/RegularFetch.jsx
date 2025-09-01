import axios from "axios";
import React, { useEffect, useState } from "react";

const RegularFetch = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    } catch (error) {
      setIsError(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <p>Please wait while loading...</p>;
  }

  if (isError) {
    return <p>Error in fetching data: {error.message}</p>;
  }

  return (
    <div className="container">
      <h3>RegularFetch</h3>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id} className="post">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegularFetch;
