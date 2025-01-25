import { useNavigate } from "react-router-dom";
import { getUserProfileData, updateProfileData } from "../services/userProfileData/getUserProfileData";
import { useEffect, useState } from "react";
import { postImageProfile } from "../services/userProfileData/postImageProfile";
import { useUserContext } from "../context/UserContext";
import useHanleErrorsHook from "./useHandleErrorsHook";

const usePerfilCuentaHook = () => {
    const { handleError, errorState, handleCloseModalError } = useHanleErrorsHook();
    const navigate = useNavigate();

    const { setUserData } = useUserContext();

    const formatBirthdate = (birthdate) => {
        return birthdate ? new Date(birthdate).toISOString().split("T")[0] : "";
    };

    const getUserData = async () => {
        try {
            const response = await getUserProfileData();
            if(response.status === 'success' && response.data) {
                const userData = response.data;
                userData.birthdate = formatBirthdate(userData.birthdate);
                setUserData(userData);
            }
        } catch (error) {
            handleError('perfil-cuenta', error);
        }
    };

    const updateImageProfile = async (image) => {
        const formData = new FormData();
        formData.append('imageProfile', image);
        try {
            const response = await postImageProfile(formData);
            if(response.status === 'success') {
                const imageUrl = `http://localhost:8001/${response.path}`
                const newData = { imageProfile: imageUrl }
                const putImage = await updateProfileData(newData);
                console.log(putImage)
                setUserData((prevData) => ({ 
                    ... prevData,
                    image_profile: putImage.image_profile || imageUrl
                }));
            }
        } catch (error) {
            handleError('perfil-cuenta', error);
        }
    };

    useEffect(() => {
      getUserData();
    }, []);
    

    return {
        getUserData,
        errorState,
        handleCloseModalError,
        updateImageProfile
    }
}

export default usePerfilCuentaHook;