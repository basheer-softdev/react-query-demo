import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchItems = ({ pageParam }) => {
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`);
};

const ReactQueryInfiniteScroll = () => {
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < 10) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <p>Please wait while loading...</p>;
  }

  if (isError) {
    return <p>Error in fetching data: {error.message}</p>;
  }
  return (
    <div className="container">
      <h3>ReactQueryInfiniteScroll</h3>
      <div className="items">
        {data?.pages.map((page) =>
          page.data.map((item) => {
            return (
              <div key={item.id} className="item">
                {item.name}
              </div>
            );
          })
        )}
      </div>
      <button
        className="load-btn"
        onClick={fetchNextPage}
        disabled={!hasNextPage}
      >
        Load More
      </button>
    </div>
  );
};

export default ReactQueryInfiniteScroll;
