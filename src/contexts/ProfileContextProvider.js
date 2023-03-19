import React, { useState, useContext } from "react";
import { useReducer } from "react";
import axios from "axios";

export const profileContext = React.createContext();
export const useProfile = () => useContext(profileContext);

const INIT_STATE = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  dateBirth: "",
  city: "",
  bio: "",
  profileImage: null,
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

      const url = `${API}/account/profile/`;
      const res = await axios(url, config);
      console.log(res);
      const data = res.data[0];
      console.log(data);
      dispatch({
        type: "GET_CURRENT_USER",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function saveEditProfile(userData) {
    try {
      //       let newObj = new FormData();
      //       for (let i in editedProfile) {
      //         newObj.append(`${i}`, userData[i]);
      //         // console.log(post[i]);
      //       }
      //       // console.log(newPost.entries);
      //       for (var pair of newObj.entries()) {
      //         console.log(pair[0] + ", " + pair[1]);
      //       }

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.put(`${API}/account/edit_profile/`, userData, config);
      getCurrentUser();
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

      console.log(email);

      await axios.post(`${API}/account/reset_password/`, email, config);

      console.log("RESET PASSWORD WORKED!!!");

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

      console.log(newData);

      await axios.post(
        `${API}/account/reset_password_complete/`,
        newData,
        config
      );

      setCheckReset(true);
      console.log("Password reset WORKED!!!");
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
