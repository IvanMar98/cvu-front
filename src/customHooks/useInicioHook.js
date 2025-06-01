import { useEffect, useState } from "react";
import { verifyAuth } from "../services/auth/auth";
import { useUserContext } from "../context/UserContext";
import { getModalById, getModalCloseAction } from "../utils/moodalConfig";
import { useNavigate } from "react-router-dom";

const useInicioHook = () => {
    const navigate = useNavigate();
    const { setLoading, setModalState } = useUserContext();

    const checkAuth = async () => {
        try {
            const response = await verifyAuth();
        } catch (error) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                const { errorCode } = error?.response?.data || {}
                const modalConfigBase = getModalById(errorCode);
                const modalConfigCopy = { ...modalConfigBase, openModal: true};
                setModalState(modalConfigCopy);
            }, 500) 
        }
    };

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            navigate('/')
        };
        setModalState(getModalById('CLEAN-MODAL'));
    }

    useEffect(() => {
      checkAuth();
    }, []);
    
    return {
        handleCloseModalError
    }
};

export default useInicioHook;