import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchItems = (pageNumber) => {
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageNumber}`);
};

const PaginationQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["items", page],
    queryFn: () => fetchItems(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Please wait while loading...</p>;
  }

  if (isError) {
    return <p>Error in fetching data: {error.message}</p>;
  }
  return (
    <div className="container">
      <h3>PaginationQueries</h3>
      <div className="items">
        {data?.data.map((item) => (
          <div className="item" key={item.id}>
            {item.id} - {item.name}
          </div>
        ))}
      </div>
      <div className="pageNumber">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          className="prev-btn"
          disabled={page == 1 ? true : false}
        >
          Previous
        </button>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((pageNumber) => (
          <button
            disabled={page == pageNumber}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className="page-number-btn"
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="next-btn"
          disabled={page == 10 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationQueries;
