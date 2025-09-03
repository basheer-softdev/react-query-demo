import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import ReactQueryFetch from "./components/ReactQueryFetch";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import ReactQueryById from "./components/ReactQueryById";
import PaginationQueries from "./components/PaginationQueries";
import ReactQueryInfiniteScroll from "./components/ReactQueryInfiniteScroll";
import ReactQueryInfiniteScrollAuto from "./components/ReactQueryInfiniteScrollAuto";
import UseQueriesDemo from "./components/UseQueriesDemo";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/regular">Regular Fetch</NavLink>
          <NavLink to="/react-query-fetch">React Query Fetch</NavLink>
          <NavLink to="/react-query-fetch-by-click">
            React Query Fetch By Click
          </NavLink>
          <NavLink to="/react-query-pagination">React Query Pagination</NavLink>
          <NavLink to="/react-query-infinite-scroll-by-button">
            React Query Infinite Scroll By Button
          </NavLink>
          <NavLink to="/react-query-infinite-scroll">
            React Query Infinite Scroll
          </NavLink>
          <NavLink to="/react-query-multi-fetching">
            React Query Multi API Fetching
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regular" element={<RegularFetch />} />
          <Route path="/react-query-fetch" element={<ReactQueryFetch />} />
          <Route
            path="/react-query-fetch-by-click"
            element={<ReactQueryFetchByClick />}
          />
          <Route
            path="/react-query-by-id/:postId"
            element={<ReactQueryById />}
          />
          <Route
            path="/react-query-pagination"
            element={<PaginationQueries />}
          />
          <Route
            path="/react-query-infinite-scroll-by-button"
            element={<ReactQueryInfiniteScroll />}
          />
          <Route
            path="/react-query-infinite-scroll"
            element={<ReactQueryInfiniteScrollAuto />}
          />
          <Route
            path="/react-query-multi-fetching"
            element={<UseQueriesDemo />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
