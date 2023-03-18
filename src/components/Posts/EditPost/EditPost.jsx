import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/AddPost.css";

import { postsContext } from "../../../contexts/PostContextProvider";

//mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const EditPost = () => {
  const { getOnePost, onePost, saveEditedPost } = useContext(postsContext);
  const [post, setPost] = useState(onePost);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getOnePost(id);
  }, []);

  useEffect(() => {
    setPost(onePost);
  }, [onePost]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleInp = (e) => {
    if (e.target.name === "image") {
      let obj = {
        ...post,
        image: e.target.files[0],
      };
      setPost(obj);
    } else {
      let obj = {
        ...post,
        [e.target.name]: e.target.value,
      };
      setPost(obj);
    }
  };

  return (
    <div className="add-main">
      {post ? (
        <Container className="add-container">
          <Box className="add-block">
            <Box className="add-main-block">
              <div className="addinfo-block">
                <Typography
                  variant="h2"
                  color="rgba(0, 0, 0, 0.87)"
                  style={{
                    fontFamily: "Mulish",
                    fontWeight: "700",
                    fontSize: "50px",
                  }}
                  id="edit-nav"
                >
                  Edit Post
                </Typography>
              </div>
              <div className="inputs-add-block">
                <TextField
                  variant="standard"
                  label="Title*"
                  placeholder="Title"
                  color="secondary"
                  fullWidth
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  type="text"
                  name="title"
                  onChange={handleInp}
                  value={post.title}
                ></TextField>
                <TextField
                  variant="standard"
                  label="Description*"
                  placeholder="Description"
                  color="secondary"
                  fullWidth
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  type="text"
                  name="description"
                  onChange={handleInp}
                  value={post.description}
                ></TextField>
                <TextField
                  variant="standard"
                  label="Price"
                  placeholder="Price"
                  color="secondary"
                  fullWidth
                  type="number"
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  name="price"
                  onChange={handleInp}
                  value={post.price}
                ></TextField>
                <TextField
                  variant="standard"
                  label="Image"
                  placeholder="Image"
                  color="secondary"
                  fullWidth
                  type="file"
                  accept="image/*"
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  name="image"
                  onChange={handleInp}
                  value={undefined}
                ></TextField>
              </div>
              <Button
                variant="contained"
                className="add-btn"
                fullWidth
                onClick={() => {
                  saveEditedPost(post);
                  navigate("/posts");
                }}
              >
                Save changes
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditPost;
