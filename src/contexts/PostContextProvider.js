import React, { useReducer, useContext } from "react";
import axios from "axios";

export const postsContext = React.createContext();
export const usePosts = () => useContext(postsContext); //custom hook

const INIT_STATE = {
  posts: [],
  pages: 0,
  onePost: null,
};


function reducer (state=INIT_STATE, action) {
    switch(action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload.results,
                pages: Math.ceil(action.payload.count / 6)  //пагинация? сколько постов?
            }
        case 'GET_ONE_POST': 
            return {
                ...state,
                onePost: action.payload,
            };
        default: 
            return state
    }
};

const API = 'http://34.141.58.26';

const PostContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function getPosts () {
        try {

            const url = `${API}/post/get_post${window.location.search}`; //параметры запроса из адресной строки ${window.location.search}

            const res = await axios(url);
            console.log(res.data);

            dispatch({
                type: 'GET_POSTS',
                payload: res.data
            });

        } catch(err) {
            console.log(err); //здесь только консоль, потому что пользователю это показывать не нужно. Дефолтное окошко можно "что то пошло не так"
        };
    };

    async function createPost(newPost, navigate) {
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };
            // const currentUser = localStorage.getItem('email');
            // const Authorization = `${currentUser}`;
            // const config = {
            //     headers: {
            //         Authorization //ключ со значением
            //     }
            // };

            const res = await axios.post(`${API}/post/create_post/`, newPost, config) //куда что кто такой
            console.log(res);
            navigate('/posts');
            getPosts();

        } catch (err) {
            console.log(err);
        };
    };

    async function getOnePost (id) {
        try {

            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };

            dispatch({
                type: 'GET_ONE_POST',
                payload: null
            });
    
            const {data} = await axios(`${API}/post/change/${id}/`, config);
    
            dispatch({
                type: 'GET_ONE_POST',
                payload: data
            });

        } catch(err) {
            console.log(err);
        }
       
    };

    async function deletePost(id) {
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };

            await axios.delete(`${API}/post/change/${id}/`, config);
            getPosts();

        } catch(err) {
            console.log(err);
        }
    };

    async function saveEditedPost(editedPost) {
       

        try {

            let newPost = new FormData();
            for (let i in editedPost) {
              newPost.append(`${i}`, editedPost[i])
              // console.log(post[i]);
            };
            // console.log(newPost.entries);
            for (var pair of newPost.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
            }

            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            };

            await axios.put(`${API}/post/change/${editedPost.id}/`, newPost, config);
            getPosts();

        } catch(err) {
            console.log(err);
        }
    }

  async function createPost(newPost, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      const res = await axios.post(`${API}/post/create_post/`, newPost, config); //куда что кто такой
      console.log(res);
      navigate("/posts");
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

  async function getOnePost(id) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      dispatch({
        type: "GET_ONE_POST",
        payload: null,
      });

      const { data } = await axios(`${API}/post/change/${id}/`, config);

      dispatch({
        type: "GET_ONE_POST",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePost(id) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.delete(`${API}/post/change/${id}/`, config);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

  async function saveEditedPost(editedPost) {

    try {
        let newPost = new FormData();

        for (let i in editedPost) {
            newPost.append(`${i}`, editedPost[i]);
        }

        for (var pair of newPost.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

      const tokens = JSON.parse(localStorage.getItem("tokens"));

      //config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization, //ключ со значением
        },
      };

      await axios.patch(
        `${API}/post/change/${editedPost.id}/`,
        newPost,
        config
      );
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

  // const fetchByParams = (query, value) => {
  //     const search = new URLSearchParams(location.search); //грамотно меняет между собой несколько параметров поиска

  //     if (value === "all") {
  //       search.delete(query); //ключ - значение
  //     } else {
  //       search.set(query, value);
  //     }

  //     const url = `${location.pathname}?${search.toString()}`;
  //     navigate(url);
  //   };

  async function toggleLike (id) {
      try {
          const tokens = JSON.parse(localStorage.getItem('tokens'));

          //config
          const Authorization = `Bearer ${tokens.access}`;
          const config = {
              headers: {
                  Authorization //ключ со значением
              }
          };

          const res = await axios.post(`${API}/feedback/${id}/like/`, id, config);
          getPosts();

      } catch (err) {
          console.log(err);
      };
  }

  return (
    <postsContext.Provider
      value={{
        posts: state.posts,
        pages: state.pages,
        onePost: state.onePost,

        getPosts,
        createPost,
        getOnePost,
        deletePost,
        saveEditedPost,
        toggleLike,
        // fetchByParams
      }}
    >
      {children}
    </postsContext.Provider>
  );
};

export default PostContextProvider;
