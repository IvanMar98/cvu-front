import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../services/userProfileData/updateUserProfileData";
import { getUserProfileData } from "../services/userProfileData/getUserProfileData";
import { useEffect, useRef, useState } from "react";
import { postImageProfile } from "../services/userProfileData/postImageProfile";
import { useUserContext } from "../context/UserContext";
import { getModalById, getModalCloseAction, retryOperation } from "../utils/moodalConfig";

const usePerfilCuentaHook = () => {
    const navigate = useNavigate();
    const [attemptNumber, setAttemptNumber] = useState(0);
    const { setUserData, setUserDataLoaded, userDataLoaded, setLoading, setModalState } = useUserContext();

    const formatBirthdate = (birthdate) => {
        return birthdate ? new Date(birthdate).toISOString().split("T")[0] : "";
    };

    const getUserData = async () => {
        setModalState({ openModal: false });
        setLoading(true);
        try {
            const response = await getUserProfileData();
            if(response.status === 'success' && response.data) {
                setTimeout(() => {
                    const userData = response.data;
                    userData.birthdate = formatBirthdate(userData.birthdate);
                    setUserData(userData);
                    setUserDataLoaded(true);
                    setLoading(false);
                },500)
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
    };
    

    const updateImageProfile = async (image) => {
        const formData = new FormData();
        formData.append('imageProfile', image);
        setLoading(true);
        try {
            const response = await postImageProfile(formData);
            if(response.status === 'success') {
                const imageUrl = `http://localhost:8001/${response.path}`
                const newData = { imageProfile: imageUrl }
                const putImage = await updateProfileData(newData);
                setUserData((prevData) => ({ 
                    ... prevData,
                    image_profile: putImage.image_profile || imageUrl
                }));
                setLoading(false);
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
    };

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            const navigateTo = closeCase.navigateTo? closeCase.navigateTo : '/inicio'
           navigate(`${navigateTo}`);
        };
        setModalState(getModalById('CLEAN-MODAL'));
    }

    useEffect(() => {
        if(!userDataLoaded){
            getUserData();
        }
    }, []);
    

    return {
        getUserData,
        handleCloseModalError,
        updateImageProfile
    }
}

export default usePerfilCuentaHook;