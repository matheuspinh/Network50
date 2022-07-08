import React, { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jwt from 'jwt-decode';

const Input = styled.textarea`
height:40px;
background-color:black;
border-radius:10px;
width:250px;
box-sizing: border-box;
border: 1px solid black;
color:white;
text-align: center;
width: 600px;
height: 200px;
resize: none;
text-align: left;
`;

const RegisterForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;`;

const Button = styled.button.attrs((/* props */) => ({ tabIndex: 0 }))`
height:40px;
background-color:black;
color: white;
width: 80px;
border-radius:20px;
border: black;
font-weight: 700;

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
      <RegisterForm onSubmit={handleSubmit}>
        <Input label="content" id="content" type="text" name="content" placeholder="What's on your mind?" onChange={handleChange} />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </RegisterForm>
    </React.Fragment>
  );
}