import React, { useContext, useState }  from 'react';
import axios from "axios";

export const commentContext = React.createContext();
export const useComments = () => useContext(commentContext); //custom hook
const COMMENT_API = "http://34.141.58.26/feedback/comment";

const CommentContextProvider = ({children}) => {
    const [comments, setComments] = useState([]);
    const [oneComment, setOneComment] = useState(null);

    const getComments = async (id) => {
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };

            let res = await axios(`${COMMENT_API}`, config);
            console.log(res.data);
            let commentsList = [];
            res.data.map(elem => elem.post === id ? commentsList.push(elem) : null);
            
            setComments(commentsList);
            console.log(commentsList);

        } catch (err) {
            console.log(err);
        }
    }

    const addComment = async (newComment, postId) => {
        try {
            let commentData = {
                body: newComment.body,
                post: postId
            }
            console.log(commentData);
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };

            let res = await axios.post(`${COMMENT_API}/`, commentData, config);

            getComments(postId);
        } catch(err) {
            console.log(err);
        };
    };

    const deleteComment = async(id) => {
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
            getComments(id)
          } catch (err) {
            console.log(err);
          }
    }

    const getOneComment = async (id) => {
        try {

            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };
    
            const {data} = await axios(`${COMMENT_API}/${id}/`, config);
            console.log(data);
    
            setOneComment(data);

        } catch(err) {
            console.log(err);
        }
    }

    const saveEditedComment = async (editedComment, postId) => {
        try {
            console.log(editedComment);
            let commentData = {
                body: editedComment.body,
                post: postId,
            }
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };
            console.log(commentData);

            let res = await axios.put(`${COMMENT_API}/${editedComment.id}`, commentData, config);

            getComments(postId);
        } catch(err) {
            console.log(err);
        };
    }

  return (
   <commentContext.Provider value={{
        comments, 
        oneComment,

        getComments,
        addComment,
        deleteComment,
        getOneComment, 
        saveEditedComment
   }}
   >
    {children}
   </commentContext.Provider>
  )
}

export default CommentContextProvider
