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

  async function handleLogin (formData, email, navigate) {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem('tokens', JSON.stringify(res.data));
      localStorage.setItem('email', email);
      setCurrentUser(email);
      console.log(res);
      navigate('/profile');

    } catch(err) {
      console.log(err);
      setError([err.response.data.detail]);

    } finally {
      setLoading(false)
    }
  }

  const values = {
    currentUser,
    error,
    loading,

    setCurrentUser,
    setError,
    handleRegister,
    handleLogin
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
