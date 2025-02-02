import { useEffect, useState } from "react";
import { verifyAuth } from "../services/auth/auth";
import useHandleErrorsHook from "./useHandleErrorsHook";
import { useUserContext } from "../context/UserContext";

const useInicioHook = () => {
    const { handleError, errorState, handleCloseModalError } = useHandleErrorsHook();
    const { setLoading } = useUserContext();
    const checkAuth = async () => {
        try {
            const response = await verifyAuth();
            if(response.status === 'success') {
                return true;
            }
            return false;
        } catch (error) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                handleError('inicio', error);
                return false;
            }, 1000) 
        }
    };

    useEffect(() => {
      checkAuth();
    }, []);
    
    return {
        errorState,
        handleCloseModalError
    }
};

export default useInicioHook;