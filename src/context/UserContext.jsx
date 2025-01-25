import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ( { children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ countries, setCountries ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ modalState, setModalState ] = useState({
        openModal: false,
        title: '',
        textBody: '',
        modalId: '',
        canUserRetry: false,
        icon: '',
        type: ''
    });

    const data = {
        userData,
        setUserData,
        countries,
        setCountries,
        loading,
        setLoading,
        modalState,
        setModalState
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);