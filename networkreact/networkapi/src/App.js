import React, { useEffect, useState } from "react";
import './App.css';
import Posts from "./components/Posts";
import HomePage from "./components/HomePage";
import axios from "axios";
import axiosInstance from "./axios";
import jwt from "jwt-decode";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`posts/`);
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <HomePage posts={posts} loading={loading} />
    </React.Fragment>
  );
}
export default App;
