import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../axios";
import styled from "styled-components";

const PostContent = styled.p`
font-size: 12px;
align-self:left;
color: white;
`;

const PostContentEdit = styled.textarea`
font-size: 12px;
font-family: apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
background-color:black;
border-radius:2px;
box-sizing: border-box;
border: 1px solid black;
color:white;
text-align: center;
width: 570px;
resize: none;
overflow: hidden;
text-align: left;
textarea:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline: 5px auto Highlight;
}
`;

const Button = styled.button.attrs((/* props */) => ({ tabIndex: 0 }))`
height: 20px;
background-color:#333;
color:white;
&hover{
  background-color:white;
  color:black;
};
`;

const EditContent = ({ postId, content, userId, currentUser }) => {
  const currentUserId = currentUser.currentUser;
  const [editingContent, setEditingContent] = useState(content);

  const onChange = (e) => setEditingContent(e.target.value);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
      updateContent(editingContent);
    };
  };
  const updateContent = (content) => {
    axiosInstance.patch(`/post/edit/${postId}/`, { content: content });
  };

  console.log(userId)
  console.log(currentUser)

  const onBlur = (e) => {
    if (e.target.value.trim() === "") {
      setEditingContent(content);
    } else {
      setEditingContent(e.target.value);
    }
  };

  const onInput = (e) => {
    if (e.target.scrollHeight > 33) {
      e.target.style.height = "5px";
      e.target.style.height = (e.target.scrollHeight - 16) + "px";
    }
  }

  return (
    <React.Fragment>
      {userId === currentUserId ? <PostContentEdit rows={1} onBlur={onBlur} onInput={(e) => onInput(e.target)} value={editingContent} onKeyDown={onKeyDown} onChange={onChange} /> : <PostContent>{content}</PostContent>}
    </React.Fragment>
  )
}

export default EditContent;