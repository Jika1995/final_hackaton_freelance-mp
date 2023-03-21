import React, { useState, useContext } from "react";
import { useReducer } from "react";
import axios from "axios";

export const profileContext = React.createContext();
export const useProfile = () => useContext(profileContext);

const INIT_STATE = {
  name: "",
  first_name: "",
  last_name: "",
  email: "",
  date_birth: "",
  city: "",
  bio: "",
  profile_image: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

const API = "http://34.141.58.26";

const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [error, setError] = useState("");

  async function getCurrentUser() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      const url = `${API}/account/profile/?t=${new Date().getTime()}`;
      const res = await axios(url, config);
      const data = res.data[0];
      // console.log("CURRENT USER", data);

      dispatch({
        type: "GET_CURRENT_USER",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function saveEditProfile(userData, navigate) {
    try {
      const newData = new FormData();

      newData.append("bio", userData.bio);
      newData.append("city", userData.city);
      newData.append("date_birth", userData.date_birth);
      newData.append("email", userData.email);
      newData.append("first_name", userData.first_name);
      newData.append("last_name", userData.last_name);
      newData.append("name", userData.name);
      newData.append("password", userData.password);

      if (typeof userData.profile_image === "object") {
        newData.append("profile_image", userData.profile_image);
      }

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.patch(`${API}/account/edit_profile/`, newData, config);
      getCurrentUser();
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  async function resetPassword(email, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      // console.log(email);

      await axios.post(`${API}/account/reset_password/`, email, config);

      // console.log("RESET PASSWORD WORKED!!!");

      getCurrentUser();
      navigate("/reset");
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data).flat(2));
    }
  }

  const [checkReset, setCheckReset] = useState(false);

  async function setNewPassword(newData, handleOpen, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      // console.log(newData);

      await axios.post(
        `${API}/account/reset_password_complete/`,
        newData,
        config
      );

      setCheckReset(true);
      // console.log("Password reset WORKED!!!");
      handleOpen();
      setTimeout(() => navigate("/profile"), 3000);
      setCheckReset(false);
      getCurrentUser();
    } catch (err) {
      setError(Object.values(err.response.data).flat(2));
      console.log(err);
    }
  }

  const values = {
    user: state.user,
    error,
    checkReset,

    getCurrentUser,
    saveEditProfile,
    resetPassword,
    setNewPassword,
    setError,
    setCheckReset,
  };
  return (
    <profileContext.Provider value={values}>{children}</profileContext.Provider>
  );
};

export default ProfileContextProvider;
