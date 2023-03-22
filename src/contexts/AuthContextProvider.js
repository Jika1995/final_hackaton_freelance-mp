import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext();
export const useAuth = () => useContext(authContext); //custom hook

const API = "http://34.141.58.26";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(formData, navigate) {
    setLoading(true);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const res = await axios.post(`${API}/account/register/`, formData);
      console.log(res);
      alert("Success!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data).flat(2));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(formData, email, navigate) {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setCurrentUser(email);
      console.log(res);
      navigate("/profile");
      let cart = {
        posts: [],
        totalPrice: 0,
      };

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.log(err);
      setError([err.response.data.detail]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout(navigate) {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    localStorage.removeItem("cart");

    setCurrentUser(false);
    navigate("/");
  }

  async function checkAuth() {
    // console.log('WORKED!');
    let tokens = JSON.parse(localStorage.getItem("tokens")); //будет JS объект с двумя ключами, refresh и access

    try {
      const Authorization = `Bearer ${tokens.access}`; //получили авторизацию
      let res = await axios.post(
        `${API}/account/refresh/`, //куда - запрос должен быть авторизованный
        { refresh: tokens.refresh }, //что отправить
        { headers: { Authorization } } //кто такой - просто передается как объект
      ); //res - ответ от сервера на мой отправленный запрос post

      //ОТВЕТ ПОЛУЧАЕШЬ ВСЕГДА при запросах, и put post patch delete, а НЕ ТОЛЬКО get

      // console.log(res);

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          refresh: tokens.refresh,
          access: res.data.access,
        })
      );

      let currentUser = localStorage.getItem("email"); //на всякий случай обновляем юзера
      setCurrentUser(currentUser);
    } catch (error) {
      console.log(error);
      handleLogout();
    }
  }

  const values = {
    currentUser,
    error,
    loading,

    setCurrentUser,
    setError,
    handleRegister,
    handleLogin,
    handleLogout,
    checkAuth,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
