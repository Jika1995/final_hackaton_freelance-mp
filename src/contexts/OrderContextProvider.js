import React, { useContext, useState } from "react";
import axios from "axios";

export const orderContext = React.createContext();
export const useOrder = () => useContext(orderContext);

const ORDER_API = "http://34.141.58.26/order/";

const OrderContextProvider = ({ children }) => {
  
  const addOrder = async (newOrder) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
          headers: {
          Authorization, //ключ со значением
      }};

      // console.log(newOrder);
      let phone = +newOrder.phone_number;
      let posts = newOrder.posts;
      // console.log(posts);

      for (let i = 0; i < posts.length; i++) {
        let order = new FormData();
        // console.log(posts[i].item.id);
        order.append("phone_number", phone);
        order.append("product", posts[i].item.id);
        
        let res = await axios.post(ORDER_API, order, config);
        console.log(res);

      };

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <orderContext.Provider value={{addOrder}}>{children}</orderContext.Provider>
  );
};

export default OrderContextProvider;