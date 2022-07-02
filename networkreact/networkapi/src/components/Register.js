import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled.section`
display:flex;
justify-content:center;
`;



export default function SignUp() {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    username: '',
    password: '',
  });
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
    console.log(formData);

    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        history.push('/login');
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <React.Fragment>
      <Wrapper>

      </Wrapper>
    </React.Fragment>
  );
};