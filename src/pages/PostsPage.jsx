import React, { useState } from "react";
import PostsList from "../components/Posts/PostsList/PostsList";
import SidebarPosts from "../components/Posts/SidebarPosts/SidebarPosts";

const PostsPage = () => {
  const [page, setPage] = useState(1);

  const [isSideBar, setIsSideBar] = useState(true);

  function changeSideBarStatus() {
    setIsSideBar(!isSideBar);
  }

  return (
    <div>
      {/* <SidebarPosts isSideBar={isSideBar} setPage={setPage} /> */}
      <PostsList page={page} setPage={setPage} />
    </div>
  );
};

export default PostsPage;
