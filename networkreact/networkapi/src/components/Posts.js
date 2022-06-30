import React from "react";
import styled from "styled-components";

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

const Home = styled.section`
display:flex;
justify-content: center;
`;

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p> Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Home>
        <Timeline>
          {posts.map((post) => {
            return (
              <Postitem key={post.id} button divider square>
                <Postheader> {post.author_name} said:</Postheader>
                <Postcontent>{post.content}</Postcontent>
                <Postdetail>{post.likes_line} last modified at: {post.edited}</Postdetail>
              </Postitem>
            )
          })}
        </Timeline>
      </Home>
    </React.Fragment >
  );
}


export default Posts;