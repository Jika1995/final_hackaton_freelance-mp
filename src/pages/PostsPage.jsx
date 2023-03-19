import React from 'react';
import PostsList from '../components/Posts/PostsList/PostsList'

const PostsPage = () => {
  const [page, setPage] = React.useState(1);

  return (
    
        <PostsList page={page} setPage={setPage}/>
   
  )
}

export default PostsPage