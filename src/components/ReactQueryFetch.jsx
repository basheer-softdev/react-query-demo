import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const res = await axios.get("http://localhost:3001/posts");
  return res.data;
};

const ReactQueryFetch = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    // staleTime: 5000, // data stays fresh for 5s
    // refetchInterval: 1000, // fetch every 10s anyway
    // refetchIntervalInBackground: true, // By default React Query pauses polling when the tab is inactive; set refetchIntervalInBackground: true to keep polling even in the background
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
        {data.map((post) => (
          <Link key={post.id} to={`/react-query-by-id/${post.id}`}>
            <li className="post">{post.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ReactQueryFetch;
