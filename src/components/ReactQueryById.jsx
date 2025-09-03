import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const fetchPostById = async (postId) => {
  const res = await axios.get(`http://localhost:3001/posts/${postId}`);
  return res.data;
};

const ReactQueryById = () => {
  const { postId } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostById(postId),
  });

  const { title, body } = data || {};

  if (isLoading) {
    return <p>Please wait while loading...</p>;
  }

  if (isError) {
    return <p>Error in fetching data: {error.message}</p>;
  }

  return (
    <div className="container">
      <h3>ReactQueryById</h3>
      <p>Title : {title}</p>
      <p>Body : {body}</p>
    </div>
  );
};

export default ReactQueryById;
