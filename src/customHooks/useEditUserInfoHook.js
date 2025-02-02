import { useEffect } from "react";
import useHanleErrorsHook from "./useHandleErrorsHook";
import { getCountries } from "../services/countries/getCountries"
import { useUserContext } from "../context/UserContext";
import { updateProfileData } from "../services/userProfileData/updateUserProfileData";
import { useNavigate } from "react-router-dom";

const useEditUserInfoHook = () => {
    const { handleError, handleCloseModalError, } = useHanleErrorsHook();
    const { setUserData, setCountries, setLoading, setModalState } = useUserContext();
    const navigate = useNavigate();

    const editUserInfo = async () => {
        console.log('edit info loading')
        setLoading(true);
        try {
            const response = await getCountries();
            console.log(response)
            if(response.status === 'succes') {
                setTimeout(() => {
                    setLoading(false)
                    setCountries(response.data);
                },1000);
            }
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                handleError('edit-info', error);
            },1000)
        }
    }

    const formatBirthdate = (birthdate) => {
        return birthdate ? new Date(birthdate).toISOString().split("T")[0] : "";
    };

    const updateUserInfo = async(newData) => {
        try {
            setLoading(true);
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
                    setModalState({
                        openModal: true,
                        title: 'Informacion Actualizada!',
                        textBody: 'La informacion a sido actualizada con exito.',
                        mainButtonText: 'Ok',
                        modalId: 'modal-user-info-updated-success',
                        canUserRetry: false,
                        icon: 'fa-solid fa-circle-check',
                        type: 'success'
                    });
                    
                },2000)
            }
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                handleError('edit-info', error);
            },1000)
        }
    }

    const handleCancelEditInfo = (isDirty) => {
        if(isDirty) {
            setModalState({
                openModal: true,
                title: 'Advertencia!',
                textBody: '¿Seguro que deseas cancelar el proceso?. Los datos ya ingresados no se guardaran',
                modalId: 'modal-edit-info-are-user-sure-to-leave',
                mainButtonText: 'Salir',
                secondaryButtonText: 'Cancelar',
                canUserRetry: true,
                icon: 'fa-solid fa-circle-check',
                type: 'warning'
            })
        }else {
            navigate('/perfil-cuenta');
        }
    }

    useEffect(() => {
        editUserInfo()
    }, []);

    return {
       handleError,
       handleCloseModalError,
       updateUserInfo,
       editUserInfo,
       handleCancelEditInfo
    }

};

export default useEditUserInfoHook;