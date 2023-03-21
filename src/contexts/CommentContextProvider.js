import React, { useContext, useState } from "react";
import axios from "axios";
import { postsContext } from "./PostContextProvider";

export const commentContext = React.createContext();
export const useComments = () => useContext(commentContext); //custom hook
const COMMENT_API = "http://34.141.58.26/feedback/comment";

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [oneComment, setOneComment] = useState(null);
  const {getOnePost, onePost, getPosts} = useContext(postsContext);

  const getComments = async (item) => {
    try {
      getPosts();
      setComments(comments);
  
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (newComment, post) => {
    try {
      let commentData = {
        body: newComment.body,
        post: post.id,
      };
      console.log(commentData);
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      let res = await axios.post(`${COMMENT_API}/`, commentData, config);

      getComments(post);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id, post) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.delete(`${COMMENT_API}/${id}`, config);
      getComments(post);

    } catch (err) {
      console.log(err);
    }
  };

  const getOneComment = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };
      setOneComment(null);

      const { data } = await axios(`${COMMENT_API}/${id}/`, config);
      console.log(data);

      setOneComment(data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveEditedComment = async (editedComment, post) => {
    try {
      console.log(editedComment.body, 'hello');
      console.log(post.id);

      // let newComment = new FormData();
      // newComment.append("body", editedComment.body);
      // newComment.append("post", post.id);

      let newComment = {
        "body": editedComment.body,
        "post": post.id
      }

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };
      // console.log(commentData);

      //  for (var pair of newComment.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }

      let res = await axios.patch(
        `${COMMENT_API}/${editedComment.id}/`,
        newComment,
        config
      );

      console.log(res);
      getComments(post);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <commentContext.Provider
      value={{
        comments,
        oneComment,

        getComments,
        addComment,
        deleteComment,
        getOneComment,
        saveEditedComment,
      }}
    >
      {children}
    </commentContext.Provider>
  );
};

export default CommentContextProvider;
