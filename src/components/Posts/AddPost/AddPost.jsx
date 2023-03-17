import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {usePosts} from '../../../contexts/PostContextProvider';
import { authContext } from '../../../contexts/AuthContextProvider';
import '../../../styles/AddPost.css'

//mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const AddPost = () => {
    const navigate = useNavigate();
    const {createPost} = usePosts();
    const {currentUser} = useContext(authContext)

    const [owner, setOwner] = useState(currentUser);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null); //потому что это объект
    const [price, setPrice] = useState(0)

    function handleSave () {
        let newPost = new FormData();
        newPost.append('title', title);
        newPost.append('description', desc);
        newPost.append('image', image);
        newPost.append('price', price);
    
        createPost(newPost, navigate);
        
    }

  return (
    <div className='add-main'>
      <Container className='add-container'>
      <Box className="add-block">
            <Box className= 'add-main-block'>
              <div className="addinfo-block">
                <Typography
                  variant="h2"
                  color="rgba(0, 0, 0, 0.87)"
                  style={{
                    fontFamily: "Mulish",
                    fontWeight: "700",
                    fontSize: "50px",
                  }}
                  id="add-nav"
                >
                  Add Post
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
                  value={title}
                  type='text'
                  onChange={e => setTitle(e.target.value)}
                ></TextField>
                <TextField
                  variant="standard"
                  label="Description*"
                  placeholder="Description"
                  color="secondary"
                  fullWidth
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  type='text'
                  value={desc} onChange={e => setDesc(e.target.value)}
                ></TextField>
                <TextField
                  variant="standard"
                  label="Price"
                  placeholder="Price"
                  color="secondary"
                  fullWidth
                  type='number'
                  sx={{ mb: "10px" }}
                  className="add-inp"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
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
                  onChange={e => setImage(e.target.files[0])} 
                ></TextField>
              </div>
              <Button
                variant="contained"
                className="add-btn"
                fullWidth
                onClick={handleSave}
              >
                Add Post
              </Button>
            </Box>
          </Box>
      </Container>
  </div>
  )
}

export default AddPost

{/* <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
<input type="text" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)}/>
<input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /> 

<button onClick={handleSave}>Save Post</button> */}