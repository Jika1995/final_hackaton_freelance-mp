import React, { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/FavoritesContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../contexts/PostContextProvider";
import { useCart } from "../../contexts/CartContextProvider";
import "../../styles/Favorites.css";

//mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Favorites = () => {
  const { deletePostFromFav, favorites, getFavorites, checkPostInFav } =
    useFavorites();
  const { getPosts, posts } = usePosts();
  const [favPosts, setFavPosts] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getCommonObjects(favorites, posts);
  }, [favorites]);

  function getCommonObjects(array1, array2) {
    const commonObjects = [];
    console.log(array1, array2);

    for (let i = 0; i < array1.length; i++) {
      console.log(array1[i].post, "worked");
      const idToCompare = array1[i].post;
      const foundObject = array2.find((obj) => {
        return obj.id === idToCompare;
      });

      if (foundObject) {
        commonObjects.push(foundObject);
      }
    }

    setFavPosts(commonObjects);

    console.log(commonObjects);

    return commonObjects;
  }

  const navigate = useNavigate();
  const { addPostToCart, checkPostInCart } = useCart();

  return (
    <div className="posts-list">
      <div className="container-post">
        {favPosts?.length !== 0 ? (
          favPosts?.map((item) => (
            <Card className="card-prod" key={item.id}>
              <CardMedia
                component="img"
                image={item.image}
                alt="error:("
                className="card-image"
              />
              <div className="content-block">
                <CardHeader
                  className="card-title"
                  title={item.title}
                  subheader={`By ${item.owner}`}
                  style={{ fontWeight: "bold !important" }}
                />

                <CardContent className="card-text">
                  <Typography variant="body2" color="text.secondary">
                    <br />
                    <span id="prodcard-price">${item.price}</span>
                  </Typography>
                </CardContent>
                <CardActions className="btns-block-prod">
                  <div className="btns-user">
                    <IconButton
                      size="small"
                      onClick={() => deletePostFromFav(item.id)}
                    >
                      {checkPostInFav(item.id) ? (
                        <FavoriteIcon style={{ color: "#DC143C" }} />
                      ) : (
                        <FavoriteBorderIcon style={{ color: "white" }} />
                      )}
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => addPostToCart(item)}
                    >
                      {checkPostInCart(item.id) ? (
                        // <ShoppingCartIcon style={{ color: "white" }} />
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/bookmark-fav-dynamic-color.png"
                          alt=""
                          width="40px"
                        />
                      ) : (
                        // <AddShoppingCartOutlinedIcon
                        //   style={{ color: "white" }}
                        // />
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/bookmark-fav-dynamic-color.png"
                          alt=""
                          width="40px"
                        />
                      )}
                    </IconButton>
                  </div>
                </CardActions>
              </div>
            </Card>
          ))
        ) : (
          <div
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{ fontSize: "30px", color: "black", marginBottom: "20px" }}
            >
              Your Favorites List is empty!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
