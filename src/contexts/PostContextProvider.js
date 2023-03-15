import React, { useReducer } from 'react';
import axios from 'axios';

export const postsContext = React.createContext();

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
        case 'GET_ONE_PRODUCT': 
            return {
                ...state,
                onePost: action.payload
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
            const tokens = JSON.parse(localStorage.getItem('tokens'));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization //ключ со значением
                }
            }

            const url = `${API}/post/get_post${window.location.search}` //параметры запроса из адресной строки

            const res = await axios(url, config);

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

            const res = await axios.post(`${API}/post/get_post/`, newPost, config) //куда что кто такой
            console.log(res);
            navigate('/posts');
            getPosts();

        } catch (err) {
            console.log(err);
        };
    };

    // async function toggleLike (id) {
    //     try {
    //         const tokens = JSON.parse(localStorage.getItem('tokens'));

    //         //config
    //         const Authorization = `Bearer ${tokens.access}`;
    //         const config = {
    //             headers: {
    //                 Authorization //ключ со значением
    //             }
    //         };

    //         const res = await axios(`${API}/products/${id}/toggle_like/`, config);
    //         getProducts();
    //     } catch (err) {
    //         console.log(err);
    //     };
    // }

  return (
    <postsContext.Provider value = {{
        posts: state.posts,
        pages: state.pages,
        onePost: state.onePost,

        getPosts,
        createPost,
        // toggleLike
    }}>
        {children}
    </postsContext.Provider>
  )
}

export default PostContextProvider