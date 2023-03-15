import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsContext } from '../../../contexts/PostContextProvider';
import { authContext } from '../../../contexts/AuthContextProvider';

const AddPost = () => {
    const navigate = useNavigate();
    const {createPost} = useContext(postsContext);
    const {currentUser} = useContext(authContext)

    const [owner, setOwner] = useState(currentUser);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null); //потому что это объект

    function handleSave () {
        let newPost = new FormData();
        newPost.append('owner', owner);
        newPost.append('title', title);
        newPost.append('description', desc);
        newProduct.append('image', image);
    
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