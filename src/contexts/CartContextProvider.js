import React, { useContext, createContext, useReducer } from "react";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountPostsInCart,
} from "../helpers/functions";

const cartContext = createContext();
export const useCart = () => useContext(cartContext);

const CART = {
  GET_CART: "GET_CART",
  GET_CART_LENGTH: "GET_CART_LENGTH",
};

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getCountPostsInCart(),
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART:
      return { ...state, cart: action.payload };
    case CART.GET_CART_LENGTH:
      return { ...state, cartLength: action.payload };
    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  let cart = JSON.parse(localStorage.getItem("cart"));

  const getCart = () => {
    if (!cart) {
      cart = {
        posts: [],
        totalPrice: 0,
      };

      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: CART.GET_CART_LENGTH,
      payload: getCountPostsInCart(),
    });

    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  // function ADD_PROD_TO_CART
  const addPostToCart = (post) => {
    if (!cart) {
      cart = {
        posts: [],
        totalPrice: 0,
      };
    }

    let newPost = {
      item: post,
      count: 1,
      subPrice: +post.price,
    };

    let postToFind = cart.posts.find(
      (elem) => elem.item.id === post.id
    );

    if (postToFind) {
      cart.posts = cart.posts.filter((elem) => elem.item.id !== post.id);
    } else {
      cart.posts.push(newPost);
    }

    cart.totalPrice = calcTotalPrice(cart.posts);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
  };

  // FUNCTION_DELETE_PRODUCT_FROM_CART
  const deletePostFromCart = (id) => {
    cart.posts = cart.posts.filter((elem) => elem.item.id !== id);
    cart.totalPrice = calcTotalPrice(cart.posts);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
  };

  // FUNCTION CHANGE_COUNT_PRODUCT
  const changePostCount = (count, id) => {

    if (count < 1) {
      deletePostFromCart(id);
    }

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.posts = cart.posts.map((post) => {
      if (post.item.id === id) {
        post.count = count;
        post.subPrice = calcSubPrice(post);
      }
      return post;
    });

    cart.totalPrice = calcTotalPrice(cart.posts);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
  };

  // FUNCTION_CHECK_FOR_BADGE
  const checkPostInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      let obj = cart.post.find((elem) => elem.item.id === id);

      if(obj) {
        return true
      } else {
        return false
      }
    }
  };

  // CONSTS
  const values = {
    cart: state.cart,
    cartLength: state.cartLength,

    addPostToCart,
    getCart,
    changePostCount,
    deletePostFromCart,
    checkPostInCart,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;