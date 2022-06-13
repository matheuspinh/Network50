import React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p> Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignContent: "column", justifyContent: "center", width: '100%' }}>
        <Box sx={{ width: '50%' }}>
          <Stack spacing={0} divider={<Divider orientation="horizontal" flexItem />}>
            {posts.map((post) => {
              return (
                <Item key={post.id} button divider square>
                  <Typography variant="p"> {post.author_name} said:</Typography>
                  <Typography gutterBottom variant="body2" display="block">{post.content}</Typography>
                  <Typography gutterBottom variant="caption">{post.likes_line} last modified at: {post.edited}</Typography>
                </Item>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </React.Fragment >
  );
}


export default Posts;