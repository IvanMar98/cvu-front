import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from '../services/login/login';
import { useUserContext } from "../context/UserContext";
import { getModalById } from "../utils/moodalConfig";

const useLoginHook = ({reset}) => {
    const navigate = useNavigate();
    const { setLoading, loading, setModalState } = useUserContext();

    const customSubmit = async (data) => {
        const { email, password } = data;
        setLoading(true);

        try {
            const response = await postLogin({email, password});
            if(response?.status?.code === 200) {
                setLoading(false);
                const { user_id, token } = response.data;
                localStorage.setItem('userToken', token);
                localStorage.setItem('userId', user_id)
                navigate('/inicio');
            } 
        } catch (error) {
            const { errorCode } = error?.response?.data || {}
            const modalConfBase = getModalById(errorCode);
            const modalConfCopy = {...modalConfBase, openModal: true};
            setTimeout(() => {
                setLoading(false);
                setModalState(modalConfCopy);  
            }, 500)
        }
    }

    const closeAndResetModalError = (e) => {
        setModalState(getModalById('CLEAN-MODAL'));
        reset();
    }

    return {
        customSubmit,
        closeAndResetModalError
    }
}

export default useLoginHook;