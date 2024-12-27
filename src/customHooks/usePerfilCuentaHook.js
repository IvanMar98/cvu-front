import { useNavigate } from "react-router-dom";
import { getUserProfileData, updateProfileData } from "../services/userProfileData/getUserProfileData";
import { getCountries } from "../services/countries/getCountries";
import { useEffect, useState } from "react";
import { postImageProfile } from "../services/userProfileData/postImageProfile";
import { useUserContext } from "../context/UserContext";
import useHanleErrorsHook from "./useHandleErrorsHook";

const usePerfilCuentaHook = () => {
    const { handleError, errorState, handleCloseModalError } = useHanleErrorsHook();
    const navigate = useNavigate();

    const { setUserData, setCountries } = useUserContext();

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

    //cambiar a hook para edit info
    const editUserData = async () => {
        try {
            const response = await getCountries();
            if(response.status === 'succes') {
                setCountries(response.data);
                navigate('/perfil-cuenta/editar-info');
            }
        } catch (error) {
            handleError(error);
        }
    }

    // cambiar a hook para edit info
    const updateUserInfo = async(newData) => {
        try {
            const response = await updateProfileData(newData);
            if(response.status === 'success') {
                const userData = response.data;
                userData.birthdate = formatBirthdate(userData.birthdate);
                setUserData((prevData) => ({
                    ...prevData,
                    ...userData
                }))
                navigate('/perfil-cuenta')
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        editUserData,
        errorState,
        handleCloseModalError,
        updateUserInfo,
        updateImageProfile
    }
}

export default usePerfilCuentaHook;