import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../axios";
import jwt from "jwt-decode";

const Like = (postId, userId) => {
  const { PostId } = props;
  const { UserId } = props;
  console.log(PostId);
  console.log(UserId);
  const [isLiked, setIsLiked] = useState(false);

////IMPLEMENTATION OF LIKE