import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ( { children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ countries, setCountries ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    return (
        <UserContext.Provider value={{userData, setUserData, countries, setCountries, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);