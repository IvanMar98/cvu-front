import React, { createContext, useState, useContext } from "react";

const PhoneNumbersContext = createContext();

export const PhoneNumberProvider = ( { children }) => {
    const [ phoneNumber, setPhoneNumber ] = useState(null);
    
    const data = {
        phoneNumber,
        setPhoneNumber
    }

    return (
        <PhoneNumbersContext.Provider value={data}>
            {children}
        </PhoneNumbersContext.Provider>
    )
}

export const usePhoneNumberContext = () => useContext(PhoneNumbersContext);