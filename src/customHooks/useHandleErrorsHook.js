import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useHanleErrorsHook = () => {
    const navigate = useNavigate();

    const [ errorState, setErrorState ] = useState({
        isError: false,
        title: '',
        textBody: '',
        modalErrorId: '',
        canUserRetry: false
    });
    const [attemptNumber, setAttemptNumber] = useState(0);

    const handleErrorsFromRegistry = (error) => {
        const status = error?.response?.status;
        let newErrorState = {isError: true, title: '', textBody: '', modalErrorId: ''};
        switch(status) {
            case 409:
                newErrorState = { ...newErrorState, ...errorsUniqueness(error) };
                break;
            case 'warning':
                newErrorState = {
                    ...newErrorState,
                    title: 'Advertencia!',
                    textBody: 'Para continuar es necesario que acepte que la informacion proporcionada es real y correcta',
                    modalErrorId: 'modal-error-accept-terms',
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
        setErrorState(newErrorState)
    }

    const handleErrorsFromLogin = (error) => {
        const status = error?.response?.status;
        let newErrorState = {isError: true, title: '', textBody: '', modalErrorId: ''};
        switch(status) {
            case 404:
                newErrorState = { ...newErrorState,
                    title: 'Error!',
                    textBody: 'Usuario no registrado',
                    modalErrorId: 'modal-error-user-already-registered'
                 };
                break;
            case 401:
                newErrorState = { ...newErrorState,
                    title: 'Error!',
                    textBody: 'Error al iniciar sesion, por favor verifica tu informacion',
                    modalErrorId: 'modal-error-login-incorrect-information'
                    };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error inesperado!',
                    textBody: 'Hubo un problema inesperado, intentalo de nuevo mas tarde',
                    modalErrorId: 'modal-error-unexpected-login',
                };
                break;
        }
        setErrorState(newErrorState)
    }

    const handleErrorsFromInicio = (error) => {
        console.log(error)
        let newErrorState = {isError: true, title: '', textBody: '', modalErrorId: ''};
        const status = error?.response?.status;
        if(status === 401) {
            console.log('dentro if')
            newErrorState = 
                {   ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalErrorId: 'modal-error-expired-token'
                }
        };
        setErrorState(newErrorState)
    }

    const handleErrorsFromPerfilCuenta = (error) => {
        console.log(error)
        const status = error?.response?.status;
        console.log(status)
        let newErrorState = {isError: true, title: '', textBody: '', modalErrorId: '', canUserRetry: false};
        switch(status) {
            case 404:
                if(error.response.data.message === 'User not found') {
                    const retryProfileAccountError = retryProfileAccount();
                    newErrorState = {
                        ...newErrorState,
                        ...retryProfileAccountError
                    };
                }else {
                    newErrorState = {
                        ...newErrorState,
                        title: 'Error!',
                        textBody: 'Error al cargar el archivo.',
                        modalErrorId: 'modal-error-image-profile',
                    };
                };
                break;
            case 400:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error!',
                    textBody: 'Error al cargar el archivo.',
                    modalErrorId: 'modal-error-image-profile',
                };
                break;
            case 401:
                newErrorState = {
                    ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalErrorId: 'modal-error-expired-token',
                };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error inesperado!',
                    textBody: 'No se pudo completar la operación.',
                    modalErrorId: 'modal-error-unexpected',
                };
                break;
        }
        setErrorState(newErrorState);
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
            default:
                break;
        }
    };

    const errorsUniqueness = (error) => {
        let newErrorState = {isError: true, title: '', textBody: '', modalErrorId: ''};
        const { errors} = error?.response?.data;
        const findFiled = errors.find((field) => field.field === 'curp' || field.field === 'rfc' || field.field === 'email').field;
        if(findFiled !== 'email') {
            newErrorState = {
                ...newErrorState,
                title: 'Advertencia!',
                textBody: 'Por favor, revisa la información e inténtalo nuevamente.',
                modalErrorId: 'modal-error-field-repeted'
            }
        }else {
            newErrorState = {
                ...newErrorState,
                title: 'Advertencia!',
                textBody: 'Parece que ya existe una cuenta registrada. Si es tuya, intenta iniciar sesión.',
                modalErrorId: 'modal-error-account-already-registered'
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
                
            default:
                resetModal();
                break;
        }
        
    };

   const retryRegistry = () => {
    let errorAttempt = {
        title: 'Error inesperado!',
        textBody: '',
        modalErrorId: 'modal-error-unexpected-registro',
        canUserRetry: true
    }
    if(attemptNumber < 3) {
        setAttemptNumber((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No se pudo completar la operación. Intentelo nuevamente',
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

   const retryProfileAccount = () => {
    let errorAttempt = {
        title: 'Error!',
        textBody: '',
        modalErrorId: 'modal-error-data',
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
   }

    const resetModal = () => {
        setErrorState({
            isError: false,
            title: '',
            textBody: '',
            modalId: '',
        });
    };

    return {
        handleError,
        handleCloseModalError,
        errorState
    }

};

export default useHanleErrorsHook;