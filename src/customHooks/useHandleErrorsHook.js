import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


const useHanleErrorsHook = () => {
    const navigate = useNavigate();

    const [attemptNumber, setAttemptNumber] = useState(0);

    const { modalState, setModalState } = useUserContext();

    const handleErrorsFromRegistry = (error) => {
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', icon: '', type: ''};
        switch(status) {
            case 409:
                newErrorState = { ...newErrorState, ...errorsUniqueness(error) };
                break;
            case 'warning':
                newErrorState = {
                    ...newErrorState,
                    title: 'Ooops!',
                    textBody: 'Para continuar es necesario que acepte que la informacion proporcionada es real y correcta',
                    modalId: 'modal-error-accept-terms',
                    mainButtonText: 'Ok',
                    icon: 'fa-solid fa-triangle-exclamation',
                    type: 'warning'
                };
                break;
            default:
                const errorRetry = retryRegistry();
                newErrorState = {
                    ...newErrorState,
                    ...errorRetry
                };
                console.log(newErrorState)
                break;
        }
        setModalState(newErrorState)
    }

    const handleErrorsFromLogin = (error) => {
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', icon: 'fa-solid fa-xmark', type: 'danger', mainButtonText: 'Ok'};
        switch(status) {
            case 404:
                newErrorState = { ...newErrorState,
                    title: 'Error!',
                    textBody: 'Usuario no registrado',
                    modalId: 'modal-error-user-already-registered'
                 };
                break;
            case 401:
                newErrorState = { ...newErrorState,
                    title: 'Error!',
                    textBody: 'Error al iniciar sesion, por favor verifica tu informacion',
                    modalId: 'modal-error-login-incorrect-information'
                    };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error inesperado!',
                    textBody: 'Hubo un problema inesperado, intentalo de nuevo mas tarde',
                    modalId: 'modal-error-unexpected-login',
                };
                break;
        }
        setModalState(newErrorState)
    }

    const handleErrorsFromInicio = (error) => {
        console.log(error)
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', icon: 'fa-solid fa-xmark', type: 'danger'};
        const status = error?.response?.status;
        if(status === 401) {
            newErrorState = 
                {   ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    mainButtonText: 'Ok',
                    modalId: 'modal-error-expired-token'
                }
        };
        setModalState(newErrorState)
    }

    const handleErrorsFromPerfilCuenta = (error) => {
        const status = error?.response?.status;
        console.log(status)
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', canUserRetry: false, icon: 'fa-solid fa-xmark', type: 'danger', mainButtonText: 'Ok'};
        switch(status) {
            case 404:
                if(error.response.data.message === 'User not found') {
                    const retryProfileAccountError = retryShowData();
                    newErrorState = {
                        ...newErrorState,
                        ...retryProfileAccountError
                    };
                }else {
                    newErrorState = {
                        ...newErrorState,
                        title: 'Error!',
                        textBody: 'Error al cargar el archivo.',
                        modalId: 'modal-error-image-profile',
                    };
                };
                break;
            case 400:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error!',
                    textBody: 'Error al cargar el archivo.',
                    modalId: 'modal-error-image-profile',
                };
                break;
            case 401:
                newErrorState = {
                    ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalId: 'modal-error-expired-token',
                };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error inesperado!',
                    textBody: 'No se pudo completar la operación.',
                    modalId: 'modal-error-unexpected',
                };
                break;
        }
        setModalState(newErrorState);
    };

    const handleErrorsFromEditInfo = (error) => {
        console.log('error edit info', error.response.status)
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', canUserRetry: false, icon: 'fa-solid fa-xmark', type: 'danger', mainButtonText: 'Ok',};
        switch(status) {
            case 404:
                const editInfoAttemps = retryShowData();
                newErrorState = {
                    ... newErrorState,
                    ...editInfoAttemps,
                    modalId: 'modal-error-data-edit-info'
                };
                break;
            case 401:
                newErrorState = {
                    ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalId: 'modal-error-expired-token',
                };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Warning',
                    textBody: 'Revisa la informacion e intentalo nuevamente',
                    modalId: 'modal-error-info-duplicated',
                    type: 'warning'
                };
        }
        setModalState(newErrorState);
    }

    const handleError = (from, error) => {
        switch(from) {
            case 'registry':
                handleErrorsFromRegistry(error);
                break;
            case 'login':
                handleErrorsFromLogin(error);
                break;
            case 'inicio':
                handleErrorsFromInicio(error);
                break;
            case 'perfil-cuenta':
                handleErrorsFromPerfilCuenta(error);
                break;
            case 'edit-info':
                handleErrorsFromEditInfo(error);
                break;
            default:
                break;
        }
    };

    const errorsUniqueness = (error) => {
        let newErrorState = {openModal: true, title: 'Ooops!', textBody: '', modalId: '', icon: 'fa-solid fa-triangle-exclamation', type: 'warning'};
        const { errors} = error?.response?.data;
        const findFiled = errors.find((field) => field.field === 'curp' || field.field === 'rfc' || field.field === 'email').field;
        if(findFiled !== 'email') {
            newErrorState = {
                ...newErrorState,
                textBody: 'Por favor, revisa la información e inténtalo nuevamente.',
                modalId: 'modal-error-field-repeted',
            }
        }else {
            newErrorState = {
                ...newErrorState,
                textBody: 'Parece que ya existe una cuenta registrada. Si es tuya, intenta iniciar sesión.',
                modalId: 'modal-error-account-already-registered'
            }
        }
        return newErrorState;
    };

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        console.log(id)
        switch(id) {
            case 'modal-error-data-primary-button':
                resetModal();
                navigate('/inicio')
                break;
            case 'modal-error-expired-token-primary-button':
                resetModal();
                navigate('/');
                break;
            case 'modal-error-accept-terms-primary-button':
                resetModal();
                break;
            case 'modal-error-field-repeted-primary-button':
                resetModal();
                break;
            case 'modal-error-account-already-registered-primary-button':
                resetModal();
                navigate('/')
                break;
            case 'modal-error-user-already-registered-primary-button':
                resetModal();
                break;
            case 'modal-error-login-incorrect-information-primary-button':
                resetModal();
                break;
            case 'modal-error-unexpected-registro-primary-button':
                resetModal();
                navigate('/')
                break;
            case 'modal-error-unexpected-login-primary-button':
                resetModal();
                break;
            case 'modal-error-image-profile-primary-button':
                resetModal();
                break;
            case 'modal-user-info-updated-success-primary-button':
                resetModal();
                navigate('/perfil-cuenta');
                break;
            case 'modal-user-registry-success-primary-button':
                resetModal();
                navigate('/'); 
                break;
            case 'modal-error-data-edit-info-primary-button':
                resetModal();
                navigate('/inicio'); 
                break;
            case 'modal-edit-info-are-user-sure-to-leave-primary-button':
                resetModal();
                navigate('/perfil-cuenta'); 
                break; 
            default:
                resetModal();
                break;
        }
        
    };

   const retryRegistry = () => {
    let errorAttempt = {
        title: 'Error inesperado!',
        textBody: '',
        modalId: 'modal-error-unexpected-registro',
        canUserRetry: true,
        mainButtonText: 'Salir',
        icon: 'fa-solid fa-xmark',
        type: 'danger'
    }
    if(attemptNumber < 3) {
        setAttemptNumber((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No se pudo completar la operación. Intentelo nuevamente',
            secondaryButtonText: 'Reintentar',
        };        
    } else {
        setAttemptNumber(0);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No se pudo completar la operación.',
            canUserRetry: false
        };
    }
    return errorAttempt;
   }

   const retryShowData = () => {
    let errorAttempt = {
        title: 'Error!',
        textBody: '',
        modalId: 'modal-error-data',
        mainButtonText: 'Ok',
        secondaryButtonText: 'Reintentar',
        canUserRetry: true
    };
    if(attemptNumber < 3) {
        setAttemptNumber((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'Error al mostrar la información. Inténtalo nuevamente.',
        };        
    } else {
        setAttemptNumber(0);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No se pudo mostrar la informacion. Intentelo de nuevo mas tarde.',
            canUserRetry: false
        };
    }
    return errorAttempt;
   };

    const resetModal = () => {
        console.log('Reset modal')
        setModalState({
            openModal: false,
            title: '',
            textBody: '',
            modalId: '',
            icon:'',
            type: '',
            canUserRetry: false
        });
    };

    return {
        handleError,
        handleCloseModalError
    }

};

export default useHanleErrorsHook;