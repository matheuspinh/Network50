import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import ProfileTimeline from "./ProfileTimeline";
import Follow from "./Follow";
import Posts from "./Posts";

const Wrapper = styled.section`
display:flex;
justify-content:center;
margin-top: 100px;
flex-direction: column;
align-items: center;
`;

const ProfileWrap = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;

const ProfileName = styled.h1`
text-align: left;
color: white;
font-weight: 700;
`;

const SignInText = styled.h4`
text-align: left;
color: white;
`;

const ProfileDetails = styled.p`
font-size: 12px;
color: #8899A6;
padding-bottom: 20px;
`;

const Button = styled.button.attrs((/* props */) => ({ tabIndex: 0 }))`
height:40px;
background-color:black;
color: white;
width: 80px;
border-radius:20px;
border-color: white;
font-weight: 700;

&:hover {
  background-color: grey;
};

&:focus {
  border: 2px solid black;
};
`;

export default function Profile() {
  const { username } = useParams();
  console.log(username);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(`user/${username}`);
      setData(res.data);
      setLoading(false);
    }
    fetchData(username);
  }, [username]);

  if (loading) {
    return <h2>Loading...</h2>;
  }


  return (
    <React.Fragment>
      <Wrapper>
        <ProfileWrap>
          <ProfileName>{data.username}</ProfileName>
          <ProfileDetails>Has {data.followers_number} followers and is following {data.following_number}</ProfileDetails>
          {!token ? <SignInText>Sign In to start following {data.username}</SignInText> : <Follow ProfileId={data.id} />}
        </ProfileWrap>
        <Wrapper>
          <Posts posts={data.posts} />
        </Wrapper>
      </Wrapper>
    </React.Fragment>
  );
}