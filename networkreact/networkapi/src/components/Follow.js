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
  const [CurrentUser, setCurrentUser] = useState({ CurrentUser: [null] });
  const [Profile, setProfile] = useState({ Profile: [null] });
  const [isFollowing, setIsFollowing] = useState({ isFollowing: [null] });

  const submitFollow = (e) => {
    axiosInstance.post(`/user/follow/` + Profile.Profile.id + `/`, {
      user_id: CurrentUser.CurrentUser.user_id,
    })
    window.location.reload(false);
  }
  const submitUnfollow = (e) => {
    axiosInstance.delete(`/user/follow/` + Profile.Profile.id + `/`, {
      user_id: CurrentUser.CurrentUser.user_id,
    })
    window.location.reload(false);

  }

  useEffect(() => {
    const getAlldata = async () => {
      let token = localStorage.getItem("access_token");
      let ProfId = await ProfileId;
      let user = await jwt(token);
      let user_id = await user.user_id;
      const res = await axiosInstance.get(
        `user/id/${user_id}/`
      );
      setCurrentUser({ CurrentUser: res.data });
      const res2 = await axiosInstance.get(
        `user/id/${ProfId}/`
      );
      setProfile({ Profile: res2.data });
      const res3 = await axiosInstance.get(`user/follow/${user_id}/${ProfId}`);
      setIsFollowing({ isFollowing: res3 });
    }; getAlldata();
  }, [setCurrentUser, setProfile, ProfileId, setIsFollowing]);

  console.log(isFollowing.isFollowing.data);

  return (
    isFollowing.isFollowing.data === "Self_user" ? <div></div> : (isFollowing.isFollowing.data === false ? <Button onClick={submitFollow}> Follow </Button> : <Button onClick={submitUnfollow}> Unfollow </Button>)
  );
}

//IMPLEMENT A CODE TO NOT SHOW THE BUTTON IOF USER IS NOT LOGGED IN

export default Follow;