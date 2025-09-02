import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const fetchItems = ({ pageParam }) => {
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`);
};

const ReactQueryInfiniteScrollAuto = () => {
  const { data, isLoading, error, isError, fetchNextPage, isFetching } =
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

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
      <div ref={ref}>{isFetching ? "Loading..." : "No More Records"}</div>
    </div>
  );
};

export default ReactQueryInfiniteScrollAuto;
