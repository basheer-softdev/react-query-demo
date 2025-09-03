import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = () => {
  return axios.get("http://localhost:3001/posts");
};

const ReactQueryFetchByClick = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    enabled: false,
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
            {post.title}
          </li>
        ))}
      </ul>
      <button onClick={refetch} className="refetch-btn">
        Load Data
      </button>
    </div>
  );
};

export default ReactQueryFetchByClick;
