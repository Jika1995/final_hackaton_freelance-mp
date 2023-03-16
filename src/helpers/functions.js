import React from 'react'

export function getCountPostsInCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart.posts.length : 0;
}

export const calcSubPrice = (post) => +post.count * post.item.price;

export const calcTotalPrice = (posts) => {
  return posts.reduce((prev, cur) => {
    return (prev += cur.subPrice);
  }, 0);
};