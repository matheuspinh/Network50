import React from "react";
import styled from "styled-components";
import Postform from "./Postform";
import Posts from "./Posts";

const Wrapper = styled.section`
display:flex;
justify-content:center;
align-items:center;
margin-top: 50px;
flex-direction: column;
`;

export default function HomePage({ posts, loading }) {

  let isLoggedIn = false;
  let token = localStorage.getItem('access_token');
  function LoggedStatus(props) {
    if (props === null) {
      return isLoggedIn = false;
    } else {
      return isLoggedIn = true;
    }
  }
  LoggedStatus(token);

  return (
    <React.Fragment>
      <Wrapper>
        {isLoggedIn ? <Postform /> : <p>You must be logged in to post</p>}
      </Wrapper>
      <Wrapper>
        <Posts posts={posts} loading={loading} />
      </Wrapper>
    </React.Fragment>
  );
}