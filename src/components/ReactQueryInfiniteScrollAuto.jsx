import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const fetchItems = async ({ pageParam }) => {
  const res = await axios.get(
    `http://localhost:3001/items?_limit=10&_page=${pageParam}`
  );
  return res.data;
};

const ReactQueryInfiniteScrollAuto = () => {
  const {
    data, // Contains all fetched pages (data.pages)
    isLoading, // True only on first fetch
    error, // Error object from fetch
    isError, // True if any fetch fails
    fetchNextPage, // Function to fetch next page
    isFetchingNextPage, // True while next page is loading
    hasNextPage, // True if getNextPageParam returned a page number
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Stop if the last page has fewer than 10 items (end of data)
      if (lastPage.length === 10) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  // inView → Boolean, true when the element is visible in the viewport.
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
          page.map((item) => {
            return (
              <div key={item.id} className="item">
                {item.name}
              </div>
            );
          })
        )}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No More Records"}
      </div>
    </div>
  );
};

export default ReactQueryInfiniteScrollAuto;
