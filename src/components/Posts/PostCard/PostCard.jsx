import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {postsContext} from '../../../contexts/PostContextProvider';


const PostCard = ({item}) => {
  const navigate = useNavigate();
  // const {toggleLike} = useContext(postsContext);

  return (
    <div>
    <h2>Title: {item.title}</h2>
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
    {/* {item.is_author ? (
      <>
        <button>Edit</button>
        <button>Delete</button>
      </>
    ) : null} */}
  </div>
  )
}

export default PostCard