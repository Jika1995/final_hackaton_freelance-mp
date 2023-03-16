import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {postsContext} from '../../../contexts/PostContextProvider';

const EditPost = () => {
    const {getOnePost, onePost, saveEditedPost} = useContext(postsContext);
    const [post, setPost] = useState(onePost);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getOnePost(id)
      }, []);
    
      useEffect(() => {
        setPost(onePost)
      }, [onePost, ]);

      const handleInp = (e) => {
        
        if(e.target.name === 'image') {
          let obj = {
            ...post,
            image: e.target.files[0]
          }
          setPost(obj);
        } else {
          let obj = {
            ...post,
            [e.target.name]: e.target.value
          };
          setPost(obj)
        }

        // let newPost = new FormData();
        // for (let i in post) {
        //   newPost.append(`${i}`, post[i])
        //   // console.log(post[i]);
        // };
        // console.log(newPost);
        // setPost(newPost)

      }



  return (
    <>
    {post ? (<>
    <h2>Edit Product</h2>
    <input type="text" name="title" onChange={handleInp} value={post.title}/>
    <input type="text" name="description" onChange={handleInp} value={post.description}/>
    <input type="text" name="image" onChange={handleInp} value={post.image}/>
    <input type="file" accept="image/*" name="image" onChange={handleInp} />

    {/* <input type="text" name="price" onChange={handleInp} value={post.price}/> */}
    <button onClick={() => {
            saveEditedPost(post);
            navigate('/posts')
    }}>Save changes</button>
    </>) : (<></>) }
    </>
  )
}

export default EditPost