import { useEffect } from "react";
import useHanleErrorsHook from "./useHandleErrorsHook";
import { useUserContext } from "../context/UserContext";
import { updateProfileData } from "../services/userProfileData/updateUserProfileData";
import { verifyAuth } from "../services/auth/auth";
import { useNavigate } from "react-router-dom";

const useBiographyHook = () => {
    const { handleError, handleCloseModalError, } = useHanleErrorsHook();
    const { setUserData, setLoading, setModalState } = useUserContext();
    const navigate = useNavigate();

    const userBiography = async () => {
        setLoading(true);
        try {
            const response = await verifyAuth();
            console.log('response', response)
            if(response.status === 'success') {
                setLoading(false);
                return true;
            }
            setLoading(false);
            return false;
        } catch (error) {
            handleError('biography', error);
            setLoading(false);
            return false;
        }
    }

    const editUserBiography = async(biography) => {
        try {
            console.log('edit biography', biography);
            setLoading(true);
            const response = await updateProfileData(biography);
            if(response.status === 'success') {
                const userData = response.data;
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
                        modalId: 'modal-user-biography-updated-success',
                        canUserRetry: false,
                        icon: 'fa-solid fa-circle-check',
                        type: 'success'
                    });
                },2000)
            }
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                handleError('biography', error);
            }, 1000)
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

    const applyStyleText = (style) => {
        console.log('apply')
        const textArea = document.getElementById('biography-text-area');
        textArea.focus();
        console.log(textArea.selectionStart)
        
        const startText = textArea.selectionStart;
        const endText = textArea.selectionEnd;


        console.log(startText, endText)
        if(startText === endText) return

        const selectedText = textArea.value.substring(startText, endText);
        let styledText = '';
        switch(style){
            case 'bold':
                styledText = `**${selectedText}**`
                break;
            case "italic":
                styledText = `*${selectedText}*`;
                break;
            case "underline":
                styledText = `__${selectedText}__`;
                break;
            default:
                styledText = selectedText;
        }
        const newText = textArea.value.substring(0, startText) +styledText + textArea.value.substring(endText);
        const newData = {
            biography: newText
        }
        
        setUserData( (prevData) => ({
            ...prevData,
            ...newData
        }));
        console.log(newData)
    }
        

    useEffect(() => {
        userBiography()
    }, []);

    return {
       editUserBiography,
       handleCloseModalError,
       handleCancelEditInfo,
       applyStyleText
    }

};

export default useBiographyHook;