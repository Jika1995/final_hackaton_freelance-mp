import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {usePosts} from '../../../contexts/PostContextProvider';
import { authContext } from '../../../contexts/AuthContextProvider';

const AddPost = () => {
    const navigate = useNavigate();
    const {createPost} = usePosts();
    const {currentUser} = useContext(authContext)

    const [owner, setOwner] = useState(currentUser);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null); //потому что это объект

    function handleSave () {
        let newPost = new FormData();
        newPost.append('title', title);
        newPost.append('description', desc);
        newPost.append('image', image);
    
        createPost(newPost, navigate);
        
    }

  return (
    <div>
    <h2>Add Post</h2>
    <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
    <input type="text" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)}/>
    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /> 

    <button onClick={handleSave}>Save Post</button>
  </div>
  )
}

export default AddPost