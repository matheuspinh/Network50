import React, { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jwt from 'jwt-decode';

const Input = styled.textarea`
background-color:black;
border-radius:3px;
box-sizing: border-box;
border: 1px solid black;
color:white;
text-align: center;
width: 600px;
height: 150px;
resize: none;
text-align: left;
`;

const PostForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
margin-top: 40px;`;

const Button = styled.button.attrs((/* props */) => ({ tabIndex: 0 }))`
height:40px;
background-color:black;
color: white;
width: 80px;
border-radius:20px;
border-color: white;
border-width: 2px;
font-weight: 700;
margin-top: 20px;

&:hover {
  background-color: grey;
};

&:focus {
  border: 2px solid black;
};`;



export default function NewPost() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    content: '',
    author: '',
  });

  let token = localStorage.getItem('access_token');
  const user = jwt(token);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      //Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post(`post/create/`, {
      content: formData.content,
      author: user.user_id,
    })
      .then((res) => {
        window.location.reload(false);
        navigate('/');
      });
  };

  return (
    <React.Fragment>
      <PostForm onSubmit={handleSubmit}>
        <Input label="content" id="content" type="text" name="content" placeholder="What's on your mind?" onChange={handleChange} />
        <Button type="submit" onClick={handleSubmit}>Post</Button>
      </PostForm>
    </React.Fragment>
  );
}