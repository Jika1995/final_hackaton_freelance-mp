import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {postsContext} from '../../../contexts/PostContextProvider';

const PostDetail = () => {
    const {getOnePost, onePost} = useContext(postsContext);
    const { id } = useParams();

    useEffect(() => {
        getOnePost(id);
    }, []);

  return (
    <div>
        {onePost ? (<>
        <h1>{onePost.title}</h1>
        <img src={onePost.image} alt="error :(" />
        <p>{onePost.description}</p>
        <p>{onePost.owner}</p>
        <p>{onePost.price}</p>

        <button>Add to Wish List</button>
        <button>Add to Cart</button>
        </>) : (<><h1>Loading...</h1></>)}
    </div>
  )
}

export default PostDetail