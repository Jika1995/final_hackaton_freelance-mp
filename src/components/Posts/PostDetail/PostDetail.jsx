import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { postsContext } from "../../../contexts/PostContextProvider";
import { useNavigate } from "react-router-dom";
import {useCart} from '../../../contexts/CartContextProvider';
import { useFavorites } from "../../../contexts/FavoritesContextProvider";
import '../../../styles/PostDetail.css';


//mui
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const PostDetail = () => {
  const { getOnePost, onePost } = useContext(postsContext);
  const { addPostToCart } = useCart();
  const {addPostToFav} = useFavorites();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOnePost(id);
  }, []);

  return (
    <div className="prod-card-main">
      {onePost ? (
        <>
        <Button className='btn-back-details' variant="contained"
             onClick={() => navigate("/posts")}> 
            <ArrowCircleLeftIcon /> 
            BACK</Button>
        <div className="prod-card-container">
          <div className="image-block" >
              <img src={onePost.image} alt="error :(" />
          </div>

          <div className="info-block-details">
  
              <h1>{onePost.title}</h1>
              <p>By {onePost.owner}</p>
              <h3 id="price">${onePost.price}</h3>
              <div className="desc-btn">
                <Button 
                  variant="contained"
                  onClick={() => addPostToCart(onePost)}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="contained"
                  onClick={() => addPostToFav(id)}
                >
                  Add to Wish List
                </Button>
              </div>
              <h4>Description</h4>
              <div className="desc-text">
                <p>{onePost.description}</p>
              </div>
          </div>
        </div>
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
