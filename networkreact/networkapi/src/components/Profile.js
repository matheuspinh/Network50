import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import ProfileTimeline from "./ProfileTimeline";
import Follow from "./Follow";

const Wrapper = styled.section`
display:flex;
justify-content:center;
margin-top: 100px;
flex-direction: column;
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

  const [data, setData] = useState({ profile: [] });
  useEffect(() => {
    axiosInstance.get('user/' + username).then((res) => {
      setData({ profile: res.data });
    });
  }, [setData, username]);

  const posts = data.profile.posts;
  const ProfileId = data.profile.id;

  return (
    <React.Fragment>
      <Wrapper>
        <ProfileWrap>
          <ProfileName>{data.profile.username}</ProfileName>
          <ProfileDetails>Has {data.profile.followers_number} followers and is following {data.profile.following_number}</ProfileDetails>
          <Follow ProfileId={ProfileId} />
        </ProfileWrap>
        <Wrapper>
          <ProfileTimeline posts={posts} />
        </Wrapper>
      </Wrapper>
    </React.Fragment>
  );
}