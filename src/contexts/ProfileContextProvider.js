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

  async function saveEditProfile(editedProfile) {
    try {
      let newObj = new FormData();
      for (let i in editedProfile) {
        newObj.append(`${i}`, editedProfile[i]);
        // console.log(post[i]);
      }
      // console.log(newPost.entries);
      for (var pair of newObj.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.put(`${API}/account/edit_profile/`, newObj, config);
      getCurrentUser();
    } catch (err) {
      console.log(err);
    }
  }

  const values = {
    user: state.user,

    getCurrentUser,
    saveEditProfile,
  };
  return (
    <profileContext.Provider value={values}>{children}</profileContext.Provider>
  );
};

export default ProfileContextProvider;
