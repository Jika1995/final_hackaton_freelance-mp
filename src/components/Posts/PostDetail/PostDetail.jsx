import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { postsContext } from "../../../contexts/PostContextProvider";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { getOnePost, onePost } = useContext(postsContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOnePost(id);
  }, []);

  return (
    <div>
      {onePost ? (
        <>
          <button onClick={() => navigate("/posts")}>BACK</button>
          <h1>{onePost.title}</h1>
          <img src={onePost.image} alt="error :(" />
          <p>{onePost.description}</p>
          <p>{onePost.owner}</p>
          <p>{onePost.price}</p>

          <button>Add to Wish List</button>
          <button>Add to Cart</button>
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  );
};

export default PostDetail;
