import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Editcontent from "./Editcontent";
import { useEffect } from "react";
import Like from "./Like";
import jwt from "jwt-decode";

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

const Posts = ({ posts, loading }) => {

  const [currentUser, setCurrentUser] = useState({ currentUser: [null] });

  useEffect(() => {
    const getAlldata = async () => {
      let token = localStorage.getItem("access_token");
      let userId = await jwt(token).user_id;
      setCurrentUser({ currentUser: userId });
    }; getAlldata();
  }, [setCurrentUser]);

  const LoggedUser = currentUser.currentUser[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  if (loading) {
    return <h2> Loading ...</h2>
  }

  return (
    <Timeline>
      {currentPosts.map((post) => {
        return (
          <Postitem key={post.id} button divider square>
            <Postheader><ProfileLink to={"/Profile/" + post.author_name}>{post.author_name} said:</ProfileLink></Postheader>
            <Editcontent timestamp={post.edited} postId={post.id} content={post.content} userId={post.author} currentUser={currentUser} />
            {LoggedUser === null ? <div></div> : (currentUser.currentUser !== post.author ? <Like likes={post.likes_line} userId={currentUser} postId={post.id} /> : <div></div>)}
          </Postitem>
        )
      })}
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </Timeline>
  );
}


export default Posts;