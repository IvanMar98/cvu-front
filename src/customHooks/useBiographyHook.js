import { useEffect, useState, useRef } from "react";
import useHanleErrorsHook from "./useHandleErrorsHook";
import { useUserContext } from "../context/UserContext";
import { updateProfileData } from "../services/userProfileData/updateUserProfileData";
import { verifyAuth } from "../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { getModalById, getModalCloseAction, retryOperation } from "../utils/moodalConfig";

const useBiographyHook = () => {
    const { setUserData, setLoading, setModalState } = useUserContext();
    const [attemptNumber, setAttemptNumber] = useState(0);
    const navigate = useNavigate();
    const lastBiografy = useRef()

    const userBiography = async () => {
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

    const editUserBiography = async(biography) => {
        lastBiografy.current = biography;
        setModalState({ openModal: false });
        setLoading(true);
        try {
            const response = await updateProfileData(biography);
            if(response.status === 'success') {
                const userData = response.data;
                setUserData((prevData) => ({
                    ...prevData,
                    ...userData
                }))
                setTimeout(() => {
                    setLoading(false);
                    const modalConfigBase = getModalById('SUCCESS-UPDATE-INFO-001');
                    const modalConfigCopy = {...modalConfigBase, openModal: true}
                    setModalState(modalConfigCopy);
                },2000)
            }
        } catch (error) {
            const { errorCode } = error?.response?.data || {};
            const modalConfigBase = getModalById(errorCode);
        
            const modalConfigCopy = { ...modalConfigBase, openModal: true};
            if(errorCode === 'UNF-003') {
                modalConfigCopy.canUserRetry = true,
                modalConfigCopy.maxRetries = 3
            }
            const { attemptNumber: newAttempt, modalConf: updatedConf } = retryOperation(modalConfigCopy, attemptNumber);
            setAttemptNumber(newAttempt);
            
            setTimeout(() => {
                setLoading(false);
                setModalState(updatedConf);
            },1000)
        }
    }
    const handleCancelEditInfo = (isDirty) => {
        if(isDirty) {
            const modalBase = getModalById('CANCEL-EDIT-INFO');
            const modalCopy = { ...modalBase, openModal: true }
            setModalState(modalCopy)
        }else {
            navigate('/perfil-cuenta');
        }
    }

    const retryUpdateBiografy = (e) => {
        const { id } = e.currentTarget;
        if(id === 'modal-edit-info-are-user-sure-to-leave-secondary-button') {
            setModalState(getModalById('CLEAN-MODAL'))
        }else {
            if(lastBiografy.current) {
                setLoading(true);
                editUserBiography(lastBiografy.current);
            }
        }
    }
    
    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            const navigateTo = closeCase.navigateTo? closeCase.navigateTo : '/perfil-cuenta'
            navigate(`${navigateTo}`);  
        };
        setModalState(getModalById('CLEAN-MODAL'));
    }

    useEffect(() => {
        userBiography()
    }, []);

    return {
       editUserBiography,
       handleCloseModalError,
       handleCancelEditInfo,
       retryUpdateBiografy
    }

};

export default useBiographyHook;