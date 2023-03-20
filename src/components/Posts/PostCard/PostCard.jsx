import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../contexts/AuthContextProvider";
import { postsContext } from "../../../contexts/PostContextProvider";
import { useCart } from "../../../contexts/CartContextProvider";
import { useProfile } from "../../../contexts/ProfileContextProvider";
import "../../../styles/PostCard.css";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const PostCard = ({ item }) => {
  const navigate = useNavigate();
  const { deletePost, toggleLike } = useContext(postsContext);
  const { currentUser } = useContext(authContext);
  const { getCurrentUser, user } = useProfile();
  const { addPostToCart, checkPostInCart } = useCart();

  const [currentPost, setCurrentPost] = useState(item);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    toggleLike();
  }, []);

  useEffect(() => {
    setCurrentPost(item);
  }, [item]);
  console.log(item);

  //MUI
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="main-postCard">
      <div
        style={{
          marginBottom: "0",
          paddingBottom: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center ",
          alignItems: "end ",
        }}
      >
        <IconButton aria-label="settings" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        {item.owner === currentUser ? (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate(`/edit/${item.id}`)}>
              Edit <SettingsSuggestIcon fontSize="small" color="warning" />
            </MenuItem>
            <MenuItem onClick={() => deletePost(item.id)}>
              Delete <DeleteIcon fontSize="small" color="error" />
            </MenuItem>
          </Menu>
        ) : null}
      </div>

      <div className="card-container">
        <CardMedia
          component="img"
          image={item.image}
          className="card-img"
          src={item.image}
          alt="error :("
          onClick={() => (currentUser ? navigate(`/details/${item.id}`) : null)}
        />
        <div className="info-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div className="card-titles">
              <Typography variant="h4">{item.title}</Typography>
              <p>by {item.owner}</p>
            </div>
            <div className="card-price">
              <p>{item.price} $</p>
            </div>
          </div>

          {currentUser ? (
            <CardActions className="use-block">
              <div className="btns-all">
                <IconButton
                  className="like-btn"
                  onClick={() => toggleLike(item?.id)}
                  style={{ color: "white" }}
                >
                  {item.likes.some(
                    (elem) => elem.is_like === true && elem.owner === user.id
                  ) ? (
                    <img
                      src="https://i.ibb.co/5ryz8nj/8703849-thumb-down-thumbs-down-dislike-icon.png"
                      width="50px"
                      height="50px"
                      style={{ marginRight: "5px" }}
                    />
                  ) : (
                    <img
                      src="https://i.ibb.co/J5pQBPY/8703802-thumb-up-thumbs-up-agree-icon.png"
                      width="50px"
                      height="50px"
                      style={{ marginRight: "5px" }}
                    />
                  )}{" "}
                  {item.total_likes}{" "}
                </IconButton>
                <div className="icon-btns">
                  <IconButton
                    size="small"
                    // onClick={() => addProductToFav(item, favUser.id)}
                  >
                    {/* {checkProductInFav(item.id) ? ( /}
                {/ <FavoriteIcon style={{ color: "#DC143C" }} /> /}
                <img src='https://i.ibb.co/C117v1b/8703847-heart-love-icon.png' width='50px' height='50px' />
              {/ ) : ( /}
                {/ <FavoriteBorderIcon style={{ color: "white" }} /> /}
              {/ )} */}
                  </IconButton>
                  <IconButton size="small" onClick={() => addPostToCart(item)}>
                    {checkPostInCart(item.id) ? (
                      <ShoppingCartIcon style={{ color: "white" }} />
                    ) : (
                      <img
                        src="https://i.ibb.co/L9TY739/8703873-bag-shopping-basket-cart-icon.png"
                        width="50px"
                        height="50px"
                      />
                    )}
                  </IconButton>
                </div>
              </div>
            </CardActions>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;

// onClick={() => toggleLike(item.id)}
// https://i.ibb.co/RgLrdQ8/likeicon.png -like src
// https://i.ibb.co/rHxhwwg/dislikeicon.png - dislike
// https://i.ibb.co/J5pQBPY/8703802-thumb-up-thumbs-up-agree-icon.png - like
// https://i.ibb.co/5ryz8nj/8703849-thumb-down-thumbs-down-dislike-icon.png - dislike

// https://i.ibb.co/C117v1b/8703847-heart-love-icon.png - fav heart
// https://i.ibb.co/bP9Mpkf/8703872-tick-check-ok-mark-accept-icon.png - added
// https://i.ibb.co/L9TY739/8703873-bag-shopping-basket-cart-icon.png - shopping bag
