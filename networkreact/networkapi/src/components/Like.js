import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../axios";
import jwt from "jwt-decode";

const Postdetail = styled.p`
font-size: 12px;
color: #8899A6;
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

const Like = (props) => {
  const PostId = props.postId;
  const UserId = props.userId.currentUser;
  const likesNumber = props.likes;

  const [isLiked, setIsLiked] = useState({ isLiked: [null] });
  const [likes, setLikes] = useState({ likes: [likesNumber] });

  useEffect(() => {
    const getAlldata = async () => {
      const res = await axiosInstance.get(`/post/like/${PostId}/`).then((res) => {
        setIsLiked({ isLiked: res.data[0] });
        setLikes({ likes: res.data[1] });
      }
      );
    };
    getAlldata();
  }, []);


  const submitLike = async () => {
    axiosInstance.patch(`/post/like/${PostId}/`, {
      user_id: UserId,
    });
  }

  const submitUnlike = async () => {
    axiosInstance.delete(`/post/like/${PostId}/`, {
      user_id: UserId,
    }).then(setLikeStatus());
  }

  const setLikeStatus = async () => {
    const res = await axiosInstance.get(`/post/like/${PostId}/`);
    setIsLiked({ isLiked: res.data[0] });
    setLikes({ likes: res.data[1] });
  };

  const onLike = (e) => {
    submitLike().then(setLikeStatus());
  }

  const onUnlike = (e) => {
    submitUnlike().then(setLikeStatus());
  }

  console.log(isLiked.isLiked);

  return (
    <React.Fragment>
      <Postdetail>Has {likes.likes}</Postdetail>
      {isLiked.isLiked === false ? <Button onClick={onLike}>Like</Button> : <Button onClick={onUnlike}>Unlike</Button>}
    </React.Fragment>
  );
}
export default Like;