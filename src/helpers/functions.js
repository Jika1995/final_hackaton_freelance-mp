import axios from "axios";

export const API = "http://34.141.58.26";

export const ACTIONS = {
  GET_USERS: "GET_USERS",
  GET_USERS_DETAILS: "GET_USERS_DETAILS",
};

export const GET_USERS = async () => {
  const data = await axios(API);
  const users = res.data;
  return users;
};
