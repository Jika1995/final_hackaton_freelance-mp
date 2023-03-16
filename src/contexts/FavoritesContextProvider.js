import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const favoritesContext = createContext();
export const useFavorites = () => useContext(favoritesContext);

// const API = "http://localhost:8000/users";

const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favUser, setFavUser] = useState({});
  const [favLength, setFavLength] = useState(0);

  const getFavUser = async () => {
    let { data } = await axios(API);
    // console.log(data);

    let email = JSON.parse(localStorage.getItem("email"));
    let userObj = data.find((item) => item.email === email);
    setFavUser(userObj);
  };

  //useEffect при загрузке страницы нужен будет
  const getCountFavorites = () => {
    return favorites ? favorites.length : 0;
  };

  const getFavorites = async () => {
    let { data } = await axios(API);
    let email = JSON.parse(localStorage.getItem("email"));
    let userObj = data.find((item) => item.email === email);

    userObj.favorites
      ? setFavLength(userObj.favorites.length)
      : setFavLength(0);
    setFavorites(userObj.favorites);
  };

  const addPostToFav = async (post, userId) => {
    let favList = favorites;

    let favPostToFind = favList.find((item) => item.id === post.id);

    if (favPostToFind) {
      favList = favList.filter((item) => item.id !== post.id);
    } else {
      favList.push(post);
    }

    await axios.patch(`${API}/${userId}`, { favorites: favList });

    // setFavorites(favList);
    getFavorites();
  };

  const deletePostFromFav = async (postId, userId) => {
    let favList = favorites;
    favList = favList.filter((item) => item.id !== postId);
    await axios.patch(`${API}/${userId}`, { favorites: favList });

    // setFavorites(favList);
    getFavorites();
  };

  const checkPostInFav = (postId) => {
    let favObj = favorites.find((item) => item.id === postId);

    if (favObj) {
      return true;
    } else {
      return false;
    }
  };

  const favCleaner = async (userId) => {
    await axios.patch(`${API}/${userId}`, { favorites: [] });
    // setFavorites([])
    getFavorites();
  };

  const values = {
    favorites,
    favUser,
    favLength,

    getFavorites,
    getFavUser,
    addPostToFav,
    deletePostFromFav,
    checkPostInFav,
    favCleaner,
    getCountFavorites,
  };

  return (
    <favoritesContext.Provider value={values}>
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
