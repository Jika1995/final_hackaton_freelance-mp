import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContextProvider";

export const favoritesContext = createContext();
export const useFavorites = () => useContext(favoritesContext);

const FAV_API = "http://34.141.58.26/feedback/favorite/";

const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favLength, setFavLength] = useState(0);

  //useEffect при загрузке страницы нужен будет
  const getCountFavorites = () => {
    return favorites ? favorites.length : 0;
  };

  const getFavorites = async () => {
   try {

    const tokens = JSON.parse(localStorage.getItem("tokens"));

    //config
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization, //ключ со значением
      },
    };

    let { data } = await axios(FAV_API, config);
    // console.log(data);

    data ? setFavLength(data.length) : setFavLength(0);
    setFavorites(data);

   } catch(err) {
    console.log(err);
   }
  };

  const addPostToFav = async (postId) => {

    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      if(checkPostInFav(postId)) {
        deletePostFromFav(postId);
        return
      }

      let formData = new FormData();
      formData.append("post", postId)

      const res = await axios.post(FAV_API, formData, config);
      console.log(res);
      getFavorites();

    } catch(err) {
      console.log(err);
    }
  
  };

  const deletePostFromFav = async (postId) => {

    try {

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      let favObj = favorites.find(item => item.post === postId);
      console.log(favObj);

      await axios.delete(`${FAV_API}${favObj.id}/`, config);
      getFavorites();
      
    } catch (err) {
      console.log(err);
    }
  };

  const checkPostInFav = (postId) => {
    let favObj = favorites.find((item) => item.post === postId);

    if (favObj) {
      return true;
    } else {
      return false;
    }
  };

  const values = {
    favorites,
    favLength,

    getFavorites,
    addPostToFav,
    deletePostFromFav,
    checkPostInFav,
    getCountFavorites,
  };

  return (
    <favoritesContext.Provider value={values}>
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
