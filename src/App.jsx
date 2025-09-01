import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import ReactQueryFetch from "./components/ReactQueryFetch";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/regular">Regular Fetch</NavLink>
          <NavLink to="/react-query-fetch">React Query Fetch</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regular" element={<RegularFetch />} />
          <Route path="/react-query-fetch" element={<ReactQueryFetch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
