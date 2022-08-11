import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import jwt from "jwt-decode";
import axiosInstance from "../axios";

const Wrapper = styled.section`
display:flex;
flex-direction:row;
height:50px;
color:white;
`;

const TextContainer = styled.div`
height:44px;
margin-right:20px;
margin-left:15px;
`;

const TextContainerRegister = styled(TextContainer)`
margin-left: auto;
`;

const Text = styled.h1`
font-size:19px;
font-weight:700;
`;

const Textlink = styled(NavLink)`
color:inherit;
text-decoration:inherit;
`;

//
function Header() {

  const token = localStorage.getItem("access_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ currentUser: [null] });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        const decodedToken = await jwt(token);
        const res = await axiosInstance.get(`user/id/${decodedToken.user_id}/`);
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      }
    }
    fetchCurrentUser();
  }, [token]);

  console.log(currentUser);

  return (
    <Wrapper>
      <TextContainer><Text>Network50</Text></TextContainer>
      {isLoggedIn === true ? <TextContainer><Text><Textlink to={"/Profile/" + currentUser.username}>Hello {currentUser.username}</Textlink></Text></TextContainer> : <div></div>}
      <TextContainer><Text><Textlink to="/">Posts</Textlink></Text></TextContainer>
      <TextContainer><Text><Textlink to="/Following">Following</Textlink></Text></TextContainer>
      <TextContainerRegister><Text><Textlink to="/Register">Register</Textlink></Text></TextContainerRegister>
      {isLoggedIn === false ? <TextContainer><Text><Textlink to="/Login">Login</Textlink></Text></TextContainer> : <TextContainer><Text><Textlink to="/Logout">Logout</Textlink></Text></TextContainer>}
    </Wrapper >
  );
}

export default Header;
