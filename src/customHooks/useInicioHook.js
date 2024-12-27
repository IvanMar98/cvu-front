import { useEffect, useState } from "react";
import { verifyAuth } from "../services/auth/auth";
import useHandleErrorsHook from "./useHandleErrorsHook";

const useInicioHook = () => {
    const { handleError, errorState, handleCloseModalError } = useHandleErrorsHook();

    const checkAuth = async () => {
        try {
            const response = await verifyAuth();
            if(response.status === 'success') {
                return true;
            }
            return false;
        } catch (error) {
            handleError('inicio', error);
            return false;
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