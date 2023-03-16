import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //следит за состоянием адресной строки и отсюда можно что то добавить в адресную строку
import { postsContext } from "../../../contexts/PostContextProvider";
import PostCard from "../PostCard/PostCard";
// import {Pagination} from '@mui/material'

const PostsList = () => {
  const { getPosts, posts, pages } = useContext(postsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(posts);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts();
  }, []);

  function getPagesCount() {
    let pageCountArr = [];
    for (let i = 1; i < pages + 1; i++) {
      pageCountArr.push(i);
    }
    return pageCountArr;
  }

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: currentPage, //adress?page=...
    });
  }, [currentPage]);

  return (
    <div>
      <h2>Posts</h2>
      {posts?.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}
      {/* <Pagination>
       <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>

        {getPagesCount().map(item => (
          item === currentPage ? 
          <Pagination.Item onClick={() => setCurrentPage(item)} active key={item}>{item} </Pagination.Item> :
          <Pagination.Item  onClick={() => setCurrentPage(item)} key={item}>{item}</Pagination.Item>
        ))}

       <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
      </Pagination> */}
    </div>
  );
};

export default PostsList;
