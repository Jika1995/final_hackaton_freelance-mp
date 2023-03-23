import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../contexts/AuthContextProvider";
import { postsContext } from "../../../contexts/PostContextProvider";
import { useCart } from "../../../contexts/CartContextProvider";
import { useProfile } from "../../../contexts/ProfileContextProvider";
import { useFavorites } from "../../../contexts/FavoritesContextProvider";

import { useComments } from "../../../contexts/CommentContextProvider";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Button } from "@mui/material";

import { Avatar, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Modal from "@mui/material/Modal";

const PostCard = ({ item }) => {
  const navigate = useNavigate();
  const { deletePost, toggleLike, getPosts, getOnePost, onePost } =
    useContext(postsContext);
  const { getCurrentUser, user } = useProfile();
  const { addPostToCart, checkPostInCart } = useCart();

  // const [currentPost, setCurrentPost] = useState(item);

  const [currentUser, setCurrentUser] = useState(localStorage.getItem("email"));

  //comment
  const {
    comments,
    getComments,
    oneComment,
    addComment,
    deleteComment,
    getOneComment,
    saveEditedComment,
  } = useComments();

  const [commentBody, setCommentBody] = useState({ body: "", id: "" });
  const [editedComment, setEditedComment] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getComments(item);
  }, []);

  // useEffect(() => {
  //   getOnePost(item.id)
  // }, [])

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // FAVORITES
  const { addPostToFav, checkPostInFav, getFavorites } = useFavorites();
  // console.log(item);

  useEffect(() => {
    getFavorites();
  }, []);

  //MUI
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //mui modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function editComment(id) {
    setEdit(true);
    await getOneComment(id);
    // console.log(commentBody);
    // console.log(oneComment);

    commentBody.body = oneComment?.body;
    commentBody.id = id;
    setCommentBody({ ...commentBody });
  }

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
        {user?.email === item.owner ? (
          <IconButton aria-label="settings" onClick={handleMenuClick}>
            {/* <MoreVertIcon /> */}
            <img
              src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-premium/512/setting-dynamic-premium.png"
              alt=""
              width="50px"
              id="btn-post-card-settings"
            />
          </IconButton>
        ) : null}

        <IconButton
          size="small"
          onClick={() => addPostToFav(item.id)}
          style={{ margin: "10px" }}
        >
          {checkPostInFav(item.id) ? (
            <img
              src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/bookmark-fav-dynamic-color.png"
              alt="error:("
              width="50px"
            />
          ) : (
            <img
              src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/bookmark-dynamic-color.png"
              alt="error:("
              width="50px"
            />
          )}
        </IconButton>

        {item.owner === user?.email ? (
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
          onClick={() => (user.email ? navigate(`/details/${item.id}`) : null)}
        />
        <div className="info-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <div className="card-titles">
              <Typography variant="h4">{item.title}</Typography>
              <p>by {item.owner}</p>
            </div>
          </div>

          {currentUser ? (
            <>
              <div className="card-info-values">
                <h3 id="total-likes-text">{item.total_likes} likes</h3>
                <h3 id="card-price-text">{item.price} $</h3>
              </div>
              <CardActions className="use-block">
                <div className="btns-all">
                  <IconButton
                    className="like-btn"
                    onClick={() => toggleLike(item)}
                    style={{ color: "white" }}
                  >
                    {item.likes.some(
                      (elem) => elem.is_like === true && elem.owner === user?.id
                    ) ? (
                      <img
                        src="https://i.ibb.co/5ryz8nj/8703849-thumb-down-thumbs-down-dislike-icon.png"
                        width="50px"
                        height="50px"
                        style={{ margin: "5px" }}
                      />
                    ) : (
                      <img
                        src="https://i.ibb.co/J5pQBPY/8703802-thumb-up-thumbs-up-agree-icon.png"
                        width="50px"
                        height="50px"
                        style={{ margin: "5px" }}
                      />
                    )}
                  </IconButton>

                  <Button
                    variant="text"
                    onClick={handleOpen}
                    id="btn-post-card-comm"
                  >
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-gradient/256/chat-bubble-dynamic-gradient.png"
                      alt=""
                      width="50px"
                    />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      style={{
                        width: "40%",
                        margin: "auto",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        All comments
                      </Typography>
                      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {item.comments ? (
                          item.comments.map((elem) => (
                            <div key={elem.id}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar
                                    alt=""
                                    src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {elem.body}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                />
                                {elem.owner === user?.email ? (
                                  <>
                                    <DeleteIcon
                                      fontSize="small"
                                      color="error"
                                      onClick={() => {
                                        deleteComment(elem.id, item);
                                      }}
                                    />
                                    <SettingsSuggestIcon
                                      fontSize="small"
                                      color="warning"
                                      onClick={() => {
                                        editComment(elem.id);
                                        setEditedComment(oneComment?.body);
                                      }}
                                    />
                                  </>
                                ) : null}
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </div>
                          ))
                        ) : (
                          <p>There is no comments yet. Be first!</p>
                        )}
                      </List>
                      <Card style={{ borderRadius: "0px" }}>
                        <Box sx={{ p: "15px" }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="flex-start"
                          >
                            <Avatar
                              src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
                              variant="rounded"
                              alt="user-avatar"
                            />
                            <TextField
                              multiline
                              fullWidth
                              minRows={4}
                              id="outlined-multilined"
                              placeholder="Add a comment"
                              value={commentBody?.body}
                              onChange={(e) => {
                                commentBody.body = e.target.value;
                                setCommentBody({ ...commentBody });
                              }}
                            />
                            {!edit ? (
                              <Button
                                size="large"
                                sx={{
                                  bgcolor: "blue",
                                  color: "white",
                                  p: "8px 25px",
                                  "&:hover": {
                                    bgcolor: "grey",
                                  },
                                }}
                                onClick={(e) => {
                                  addComment(commentBody, item);
                                  setCommentBody({ body: "" });
                                }}
                              >
                                Send
                              </Button>
                            ) : (
                              <Button
                                size="large"
                                sx={{
                                  bgcolor: "blue",
                                  color: "white",
                                  p: "8px 25px",
                                  "&:hover": {
                                    bgcolor: "grey",
                                  },
                                }}
                                onClick={(e) => {
                                  setEdit(false);
                                  saveEditedComment(commentBody, item);
                                  setCommentBody({ body: "" });
                                }}
                              >
                                Save
                              </Button>
                            )}
                          </Stack>
                        </Box>
                      </Card>
                    </Box>
                  </Modal>
                  <div className="icon-btns">
                    <IconButton
                      size="small"
                      onClick={() => addPostToCart(item)}
                    >
                      {checkPostInCart(item.id) ? (
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/eth-dynamic-color.png"
                          width="50px"
                          height="50px"
                        />
                      ) : (
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-gradient/512/eth-dynamic-gradient.png"
                          width="50px"
                          height="50px"
                        />
                      )}
                    </IconButton>
                  </div>
                </div>
              </CardActions>
            </>
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
