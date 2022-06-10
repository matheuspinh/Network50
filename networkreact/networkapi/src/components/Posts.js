import React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Paper from "@material-ui/core/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
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
          <Stack spacing={1}>
            {posts.map((post) => {
              return (
                <Item key={post.id}>
                  <Typography gutterBottom variant="h6">{post.writer} said:</Typography>
                  <Typography gutterBottom variant="p">{post.content}</Typography>
                  <Typography gutterBottom variant="p">last modified at:{post.last_modified}</Typography>
                </Item>

              )
            })}
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}


export default Posts;