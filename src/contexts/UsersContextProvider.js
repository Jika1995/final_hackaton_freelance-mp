import React, { useContext, createContext, useState } from "react";
import axios from "axios";

export const usersContext = createContext();
export const useUsers = () => useContext(usersContext);

const BUYERS_API = 'http://34.141.58.26/account/buyers/';
const EXECUTANTS_API = 'http://34.141.58.26/account/executants/';
const RATING_API = 'http://34.141.58.26/feedback'

const UsersContextProvider = ({children}) => {
    const [buyers, setBuyers] = useState([]);
    const [executants, setExecutants] = useState([]);

    async function getBuyers () {
        try {
            const tokens = JSON.parse(localStorage.getItem("tokens"));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                Authorization, //ключ со значением
            }};

            let {data} = await axios(BUYERS_API, config);
            console.log(data);

            setBuyers(data);

        } catch(err) {
            console.log(err);
        };
    };

    async function getExecutants () {
        try {
            const tokens = JSON.parse(localStorage.getItem("tokens"));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                Authorization, //ключ со значением
            }};

            let {data} = await axios(EXECUTANTS_API, config);
            console.log(data);

            setExecutants(data);
            
        } catch(err) {
            console.log(err);
        }
    } 

    async function putRating (userId, rateValue) {
        try {
            const tokens = JSON.parse(localStorage.getItem("tokens"));

            //config
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                Authorization, //ключ со значением
            }};

            const ratingValue = new FormData();
            ratingValue.append("rating", rateValue);

            let res = await axios.post(`${RATING_API}/${userId}/rating/`, ratingValue, config);
            console.log(res);
            
        } catch(err) {
            console.log(err);
        }
    }

    return (
        
        <usersContext.Provider value={{
            buyers, 
            executants,

            getBuyers,
            getExecutants,
            putRating
        }}>
            {children}
        </usersContext.Provider>
    )
}

export default UsersContextProvider;