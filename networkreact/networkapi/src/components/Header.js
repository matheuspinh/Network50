import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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


function Header() {
  return (
    <Wrapper>
      <TextContainer><Text>Network50</Text></TextContainer>
      <TextContainer><Text><Textlink to="/">Posts</Textlink></Text></TextContainer>
      <TextContainer><Text><Textlink to="/Following">Following</Textlink></Text></TextContainer>
      <TextContainerRegister><Text><Textlink to="/Register">Register</Textlink></Text></TextContainerRegister>
      <TextContainer><Text><Textlink to="/Login">Login</Textlink></Text></TextContainer>
      <TextContainer><Text><Textlink to="/Logout">Logout</Textlink></Text></TextContainer>
    </Wrapper >
  );
}

export default Header;
