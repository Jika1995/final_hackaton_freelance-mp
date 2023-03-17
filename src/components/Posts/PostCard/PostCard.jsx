import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../contexts/AuthContextProvider";
import {postsContext} from '../../../contexts/PostContextProvider';
import '../../../styles/PostCard.css';

import { Button, Typography, Icon } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PostCard = ({item}) => {
  const navigate = useNavigate();
  // const {toggleLike} = useContext(postsContext);
  const {deletePost} = useContext(postsContext);
  const {currentUser} = useContext(authContext);

  return (
    <div className="main-postCard">
      <div className="card-container">
      <img
      className="card-img"
      src={item.image}
      alt=""
    />
    <div className="info-card">
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
      <div className="card-titles">
        <Typography variant="h4">{item.title}</Typography>
        <p>by {item.owner}</p>
      </div>
      <div className="card-price">
        <p>{item.price} $</p>
      </div>
      </div>
      <div className="use-block">
      {item.owner === currentUser? (
      <div className="owner-btns">
        <Button onClick={() => navigate(`/edit/${item.id}`)} className='edit-btn'>
          Edit
        </Button>
        <Button onClick={() => deletePost(item.id)} className='delete-btn'>
          Delete
        </Button>
      </div>
    ) : null}
      <div>
        <Button>View</Button>
        <FavoriteIcon/>
        <ShoppingCartIcon/>
        <Button className="like-btn"><h2>100 {item.likes} </h2><ThumbUpIcon/> </Button>
      </div>
      </div>
    </div>
      </div>
  </div>
  )
}

export default PostCard

// onClick={() => toggleLike(item.id)}