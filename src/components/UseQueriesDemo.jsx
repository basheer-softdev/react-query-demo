import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchPostsById = async (id) => {
  const response = await axios.get(`http://localhost:3001/posts/${id}`);
  return response.data;
};

const MultiplePosts = ({ postsIds }) => {
  const postQueries = useQueries({
    queries: postsIds.map((id) => ({
      queryKey: ["posts", id],
      queryFn: () => fetchPostsById(id),
    })),
  });

  const isLoading = postQueries.some((query) => query.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(postQueries);

  return (
    <div className="posts">
      {postQueries.map((query, index) => (
        <div className="post" key={index}>
          <h4>
            {query.data.id} - {query.data.title}
          </h4>
          <p>{query.data.body}</p>
        </div>
      ))}
    </div>
  );
};

const UseQueriesDemo = () => {
  const postIds = [1, 5, 6, 8];
  return (
    <div className="container">
      <h3>UseQueriesDemo</h3>
      <MultiplePosts postsIds={postIds} />
    </div>
  );
};

export default UseQueriesDemo;
