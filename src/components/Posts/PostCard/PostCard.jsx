import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../contexts/AuthContextProvider";
import {postsContext} from '../../../contexts/PostContextProvider';

const PostCard = ({item}) => {
  const navigate = useNavigate();
  // const {toggleLike} = useContext(postsContext);
  const {deletePost} = useContext(postsContext);
  const {currentUser} = useContext(authContext);

  return (
    <div>
    <h2>Title: {item.title}</h2>
    <h2>by {item.owner}</h2>
    <img
      src={item.image}
      alt=""
      style={{ width: "500px", height: "500px" }}
    />
    <p>
      <br />
      {/* Likes: {item.likes} */}
    </p>
    <p>{item.description}</p>
    {/* <button onClick={() => toggleLike(item.id)}>Like</button> */}
    {item.owner === currentUser? (
      <>
        <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
        <button onClick={() => deletePost(item.id)}>Delete</button>
      </>
    ) : null}
  </div>
  )
}

export default PostCard