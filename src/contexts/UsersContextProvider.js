import React, { useContext, createContext } from "react";
import axios from "axios";

export const usersContext = createContext();
export const useUsers = () => useContext(usersContext);

const USERS_API = '';

const UsersContextProvider = ({children}) => {

    return (
        
        <usersContext.Provider value={{

        }}>
            {children}
        </usersContext.Provider>
    )
}

export default UsersContextProvider;