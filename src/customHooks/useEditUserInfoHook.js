import { useEffect, useState, useRef } from "react";
import useHanleErrorsHook from "./useHandleErrorsHook";
import { getCountries } from "../services/countries/getCountries"
import { useUserContext } from "../context/UserContext";
import { updateProfileData } from "../services/userProfileData/updateUserProfileData";
import { useNavigate } from "react-router-dom";
import { getModalById, retryOperation, getModalCloseAction } from "../utils/moodalConfig";

const useEditUserInfoHook = () => {
    const { setUserData, setCountries, setLoading, setModalState } = useUserContext();
    const [ attemptNumber, setAttemptNumber ] = useState(0);
    const navigate = useNavigate();
    const lastUserInfo = useRef()

    const editUserInfo = async () => {
        setModalState({ openModal: false });
        setLoading(true);
        try {
            const response = await getCountries();
            if(response.status === 'succes') {
                setTimeout(() => {
                    setLoading(false)
                    setCountries(response.data);
                },1000);
            }
        } catch (error) {
            const { errorCode } = error?.response?.data || {};
            const modalConfigBase = getModalById(errorCode);
            const modalConfigCopy = { ...modalConfigBase, openModal: true};
            const { attemptNumber: newAttempt, modalConf: updatedConf } = retryOperation(modalConfigCopy, attemptNumber);
            setAttemptNumber(newAttempt);
            setTimeout(() => {
                setLoading(false);
                setModalState(updatedConf);
            },1000)
        }
    }

    const formatBirthdate = (birthdate) => {
        return birthdate ? new Date(birthdate).toISOString().split("T")[0] : "";
    };

    const updateUserInfo = async(newData) => {
        lastUserInfo.current = newData;
        setModalState({ openModal: false });
        setLoading(true);
        try {
            const response = await updateProfileData(newData);
            if(response.status === 'success') {
                const userData = response.data;
                userData.birthdate = formatBirthdate(userData.birthdate);
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

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            const navigateTo = closeCase.navigateTo? closeCase.navigateTo : '/perfil-cuenta'
            navigate(`${navigateTo}`);  
        };
        setModalState(getModalById('CLEAN-MODAL'));
    }

    const retryEditInfo = (e) => {
        const { id } = e.currentTarget;
        if(id === 'modal-error-PNF-001-secondary-button') {
            setLoading(true);
            editUserInfo();
        }else if(id === 'modal-error-UNF-003-secondary-button'){
            if(lastUserInfo.current){
                
                updateUserInfo(lastUserInfo.current);
            }
        }else {
            setModalState(getModalById('CLEAN-MODAL'))
        }
    }

    const handleCancelEditInfo = (isDirty) => {
        if(isDirty) {
            const modalBase = getModalById('CANCEL-EDIT-INFO');
            const modalCopy = { ...modalBase, openModal: true }
            setModalState(modalCopy);
        }else {
            navigate('/perfil-cuenta');
        }
    }

    useEffect(() => {
        editUserInfo()
    }, []);

    return {
       handleCloseModalError,
       updateUserInfo,
       editUserInfo,
       handleCancelEditInfo,
       retryEditInfo
    }

};

export default useEditUserInfoHook;