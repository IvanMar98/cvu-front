import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from '../services/login/login';
import useHanleErrorsHook from "./useHandleErrorsHook";
import { useUserContext } from "../context/UserContext";

const useLoginHook = ({reset}) => {
    const navigate = useNavigate();
    const {handleError, errorState, handleCloseModalError} = useHanleErrorsHook();
    const { setLoading, loading } = useUserContext();

    const customSubmit = async (data) => {
        const { email, password } = data;
        setLoading(true);
        try {
            const response = await postLogin({email, password});
            if(response?.status?.code === 200) {
                setTimeout(() => {
                    setLoading(false);
                    const { user_id, token } = response.data;
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('userId', user_id)
                    navigate('/inicio');
                },2000)  
            }
        } catch (error) {
            if(error) {
                setTimeout(() => {
                    setLoading(false);
                    handleError('login', error);
                },1000);
            }
        }
    }

    const closeAndResetModalError = (e) => {
        handleCloseModalError(e);
        reset();
    }

    return {
        customSubmit,
        loading,
        errorState,
        closeAndResetModalError
    }
}

export default useLoginHook;