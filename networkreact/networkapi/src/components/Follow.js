import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import jwt from "jwt-decode";

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

const Follow = (props) => {
  const { ProfileId } = props;
  let token = localStorage.getItem("access_token");
  const user = jwt(token);
  const user_id = user.user_id;
  const [data, setData] = useState({ user: [] });
  useEffect(() => {
    axiosInstance.get("user/id/" + user_id).then((res) => {
      console.log(res.data);
    });
  }, [setData, user_id]);
  console.log(data.user);
  //Change follow state according to the user
  const isFollowing = data.user.following.includes(ProfileId);

  const submitFollow = (e) => {
    axiosInstance.post(`/user/follow/` + ProfileId + `/`, {
      user_id: user.user_id,
    });
  }
  const submitUnfollow = (e) => {
    axiosInstance.delete(`/user/unfollow/` + ProfileId + `/`, {
      user_id: user.user_id,
    });

  }
  return (
    <React.Fragment>
      {isFollowing ? <Button onClick={submitFollow}> Follow </Button> : <Button onClick={submitUnfollow}> Unfollow </Button>}
    </React.Fragment>
  );
}

export default Follow;