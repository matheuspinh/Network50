import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import axiosInstance from "../axios";
import Posts from "./Posts";

const Postheader = styled.h1`
font-size: 15px;
text-align: left;
color: white;
font-weight: 700;
`;

const Postcontent = styled.p`
font-size: 12px;
align-self:left;
color: white;
`;

const Postdetail = styled.p`
font-size: 12px;
color: #8899A6;
`;

const Postitem = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 15px;
border-bottom: 1px;
border-color: grey;
border-bottom-style: solid;
`;

const Timeline = styled.div`
display:flex;
flex-direction: column;
background: black;
margin-bottom: 4px;
width: 600px;
align-items: stretch;
`;

const ProfileLink = styled(Link)`
color: inherit;
`;

const Home = styled.section`
flex-direction: column;
align-items: center;
display:flex;
justify-content: center;
`;
///IMPLEMENTATION OF THE FOLLOWING PAGE
export default function Following() {
  //Implementation Via Backend
  let token = localStorage.getItem("access_token");
  let user = jwt(token).user_id;

  const [data, setData] = useState({ posts: [] });
  useEffect(() => {
    axiosInstance.get(`user/follows/${user}/posts/`).then((res) => {
      setData({ posts: res.data });
    });
  }, [setData, user]);

  const posts = data.posts;

  if (!posts || posts.length === 0) return <p>Start Following someone to see their posts!</p>;
  return (
    <React.Fragment>
      <Home>
        <Posts posts={posts} />
        {/* <Timeline>
          {posts.map((post) => {
            return (
              <Postitem key={post.id} button divider square>
                <Postheader><ProfileLink to={"/Profile/" + post.author_name}>{post.author_name} said:</ProfileLink></Postheader>
                <Postcontent>{post.content}</Postcontent>
                <Postdetail>{post.likes_line} last modified at: {post.edited}</Postdetail>
              </Postitem>
            )
          })}
        </Timeline> */}
      </Home>
    </React.Fragment >
  );
}