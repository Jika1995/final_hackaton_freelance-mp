import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //следит за состоянием адресной строки и отсюда можно что то добавить в адресную строку
import { postsContext } from "../../../contexts/PostContextProvider";
import PostCard from "../PostCard/PostCard";
import { Pagination } from "@mui/material";
import "../../../styles/PostsPage.css";
import SidebarPosts from "../SidebarPosts/SidebarPosts";

const PostsList = ({ page, setPage }) => {
  const { getPosts, posts, pages } = useContext(postsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  const handlePage = (e, p) => {
    setPage(p);
  };

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: page, //adress?page=...
    });
  }, [page]);

  return (
    <div className="posts-main">
      <div className="posts-block">
        {posts ? (
          posts.map((item) => <PostCard key={item.id} item={item} />)
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      <Pagination
        count={pages}
        page={page}
        onChange={handlePage}
        id="pagination"
        color="secondary"
        variant="outlined"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      />
    </div>
  );
};

export default PostsList;
