import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jwt from "jwt-decode";
import axiosInstance from "../axios";
import Posts from "./Posts";

const Wrapper = styled.section`
display:flex;
justify-content:center;
align-items:center;
margin-top: 50px;
flex-direction: column;
`;

const Home = styled.section`
flex-direction: column;
align-items: center;
display:flex;
justify-content: center;
`;

export default function Following() {
  //Implementation Via Backend
  let token = localStorage.getItem("access_token");
  const [user, setUser] = useState({ user: [null] });


  const [data, setData] = useState({ posts: [] });
  useEffect(() => {
    if (token) {
      setUser(jwt(token).user_id);
      console.log(jwt(token));
      axiosInstance.get(`user/follows/${user}/posts/`).then((res) => {
        setData({ posts: res.data });
      });
    }
  }, [setData, user, token]);

  const posts = data.posts;
  if (!token) return <Wrapper><p>Start Following someone to see their posts!</p></Wrapper>;
  return (
    <React.Fragment>
      <Home>
        <Posts posts={posts} />
      </Home>
    </React.Fragment >
  );
}