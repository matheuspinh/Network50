import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled.section`
display:flex;
justify-content:center;
margin-top: 100px;
`;

const FormWrapper = styled(Wrapper)`
width: 340px;
height: 334px;
background-color: #253341;
border-radius: 10px;
margin-top:0;
`;

const RegisterForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;`;

const Input = styled.input`
height:40px;
background-color:black;
border-radius:10px;
width:250px;
box-sizing: border-box;
border: 1px solid black;
color:white;
text-align: center;
`;

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
};
`;



export default function SignUp() {
  const navigate = useNavigate();
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
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        navigate('/login');
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <React.Fragment>
      <Wrapper>
        <FormWrapper>
          <RegisterForm>
            <Input label="Username" name="username" id="username" placeholder="Username" onChange={handleChange} />
            <Input label="Email" id="email" name="email" placeholder="Email" onChange={handleChange} />
            <Input label="Password" id="password" type="password" name="password" placeholder="Password" onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
          </RegisterForm>
        </FormWrapper>
      </Wrapper>
    </React.Fragment>
  );
};