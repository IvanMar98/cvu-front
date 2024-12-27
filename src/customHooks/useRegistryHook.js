import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { newRegistry } from "../services/records/postRecord"
import useHanleErrorsHook from "./useHandleErrorsHook";
import { useUserContext } from "../context/UserContext";

const useRegistryHook = ({ acceptTermsAndConditions }) => {
    const navigate = useNavigate();
    const { handleError, errorState, handleCloseModalError} = useHanleErrorsHook();
    const { setLoading, loading } = useUserContext();

    const customSubmit = async (data) => {
        setLoading(true);
        const { names, firstLastName, secondLastName, curp, rfc, email, password } = data;
        if (!acceptTermsAndConditions) {
            const error = {
                response: {
                    status: 'warning'
                }
            }
            setTimeout(() => {
                setLoading(false);
                handleError('registry', error);
            },500)
            return
        }
        try {
            setLoading(true);
            const response = await newRegistry({ names, firstLastName, secondLastName, curp, rfc, email, password })
            if(response.status === 'success') {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/'); 
                },2000)
            }
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                handleError('registry', error);
            },1000)
        }
    }

    return {
        customSubmit,
        loading,
        handleCloseModalError,
        errorState
    }
}

export default useRegistryHook;