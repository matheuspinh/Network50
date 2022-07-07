import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Posts from "./Posts";
import PostLoading from "./PostLoading";

const Wrapper = styled.section`
display:flex;
justify-content:center;
margin-top: 100px;
`;

const ProfileWrap = styled(Wrapper)`
`;

const ProfileName = styled.h1`
text-align: left;
color: white;
font-weight: 700;
`;

const ProfileDetails = styled.p`
font-size: 12px;
color: #8899A6;
`;


export default function Profile() {
  const { username } = useParams();

  const [data, setData] = useState({ profile: [] });
  useEffect(() => {
    axiosInstance.get('user/' + username).then((res) => {
      setData({ profile: res.data });
      console.log(res.data);
    });
  }, [setData]);

  const posts = data.profile.posts;

  return (
    <React.Fragment>
      <Wrapper>
        <ProfileWrap>
          <ProfileName>{data.profile.username}</ProfileName>
          <ProfileDetails>Has {data.profile.followers_number} followers and is following {data.profile.following_number}</ProfileDetails>
        </ProfileWrap>
        <Wrapper>
          <Posts posts={posts} />
        </Wrapper>
      </Wrapper>
    </React.Fragment>
  );
}