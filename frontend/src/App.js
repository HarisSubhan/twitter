import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "react-loading-skeleton/dist/skeleton.css";
import SinglePost from "./pages/posts/SinglePost";
function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/single-post/:id" element={<SinglePost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
