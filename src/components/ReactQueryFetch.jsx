import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchPosts = () => {
  return axios.get("http://localhost:3001/posts");
};

const ReactQueryFetch = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  if (isLoading) {
    return <p>Please wait while loading...</p>;
  }

  if (isError) {
    return <p>Error in fetching data: {error.message}</p>;
  }

  return (
    <div className="container">
      <h3>ReactQueryFetch</h3>
      <ul className="posts">
        {data?.data.map((post) => (
          <li className="post" key={post.id}>
            {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQueryFetch;
