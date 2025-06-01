import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


const useHanleErrorsHook = () => {
    const navigate = useNavigate();

    const [attemptNumber, setAttemptNumber] = useState(0);
    const [attemptDeleteNumberError, setAttemptDeleteNumberError] = useState(0);

    const { modalState, setModalState, setLoading } = useUserContext();

    const handleErrorsFromInicio = (error) => {
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', icon: 'fa-solid fa-xmark', type: 'danger'};
        const status = error?.response?.status;
        console.log(error)
        if(status === 401) {
            newErrorState = 
                {   ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    mainButtonText: 'Ok',
                    modalId: 'modal-error-expired-token'
                }
        }else {
            newErrorState = 
                {   ...newErrorState,
                    title: 'Error Inesperado!',
                    textBody: 'No se pudo completar la operación.',
                    modalId: 'modal-error-unexpected',
                    mainButtonText: 'Salir'
                }
        }
        setModalState(newErrorState)
    }

    const handleErrorsFromEditInfo = (error) => {
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
    };

    const handleErrorsFromPhoneNumbers = (error) => {
        console.log('error fomr erroshook', error)
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', canUserRetry: false, icon: 'fa-solid fa-xmark', type: 'danger', mainButtonText: 'Ok',};
        switch(status) {
            case 404:
                const editInfoAttemps = retryShowData();
                newErrorState = {
                    ... newErrorState,
                    ...editInfoAttemps,
                    modalId: 'modal-error-phone-numbers'
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
        }
        setModalState(newErrorState);
    };

    const handleErrorsFromAddNewPhoneNumber = (error) => {
        console.log('from add new phone number error ',error);
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: '', textBody: '', modalId: '', icon: 'fa-solid fa-xmark', type: 'danger'};

        switch(status) {
            case 404:
                newErrorState = {
                    ...newErrorState,
                    ...retryActionNumber('add')
                };
                break;
            case 409:
                newErrorState = { ...newErrorState, ...errorsUniquenessAddPhoneNumber(error) };
                break;
            case 401:
                newErrorState = {
                    ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalId: 'modal-error-expired-token',
                    type: 'danger',
                    mainButtonText: 'Ok'
                };
                break;
            default:
                newErrorState = {
                    ...newErrorState,
                    title: 'Error inesperado!',
                    textBody: 'No se pudo completar la operación.',
                    modalId: 'modal-error-unexpected',
                    mainButtonText: 'Salir'
                };
                break;
        }
        debugger
        setModalState(newErrorState)

    }

    const handleErrorsFromDeletePhoneNumber = (error) => {
        const status = error?.response?.status;
        let newErrorState = {openModal: true, title: 'Error!', textBody: '',modalId: 'modal-error-delete-phone-number', icon: 'fa-solid fa-xmark', type: 'danger'};

        switch(status) {
            case 404:
                newErrorState = { ...newErrorState, ...retryActionNumber('delete') };
                break;
            case 401:
                newErrorState = {
                    ...newErrorState,
                    title: 'Sesión Expirada',
                    textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
                    modalId: 'modal-error-expired-token',
                    icon: 'fa-solid fa-xmark',
                    type: 'danger',
                    mainButtonText: 'Ok'
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
        setModalState(newErrorState)
    }

    const handleError = (from, error) => {
        console.log(from)
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
            case 'biography':
                handleErrorsFromEditInfo(error);
                break;
            case 'phone-numbers':
                handleErrorsFromPhoneNumbers(error);
                break;
            case 'registry-new-phone-number':
                handleErrorsFromAddNewPhoneNumber(error);
                break;
            case 'phone-numbers-delete-error':
                handleErrorsFromDeletePhoneNumber(error);
                break;
            default:
                break;
        }
    };

    const handleRequest = async (callBack, options = { } ) =>  {
        const { maxRetries = 3, retryOnFailure = false } = options;
        try{
            return await callBack();
        } catch(error) {
            console.log('error', error)
            setTimeout (() => {
                if (handleCustomErrors(error)) return;
                handleErrorResponse(error, retryOnFailure, maxRetries);
            }, 5000);
        }
    }

    const handleCustomErrors = (error) => {
        if (error.type === "TERMS_NOT_ACCEPTED") {
            setLoading(false)
            setModalState({
                openModal: true,
                title: "Warning",
                textBody: "Debes aceptar los términos y condiciones para continuar.",
                modalId: "modal-terms-error",
                mainButtonText: "Ok",
                canUserRetry: false, 
                icon: "fa-solid fa-exclamation-triangle",
                type: "warning",
            });
            return true; // Indica que ya se manejó el error
        }else {
            return false; // Si no es un error reconocido, se maneja por otro lado
        }
    };

    const handleErrorResponse = (error, retryOnFailure, maxRetries) => {
        const { status = '' } = error?.response || {};
        const { message = '', errorCode = '', errors  = []} = error?.response?.data || {};
        switch(status){
            case 409:
                errorsUniqueness(message, errorCode, errors);
                break;
            case 400:
                if(retryOnFailure){
                    retryError(message, maxRetries, errorCode);
                }else {
                    setModalState({
                        openModal: true,
                        title: 'Ooops!',
                        modalId: `modal-error-${errorCode}`,
                        canUserRetry: false,
                        mainButtonText: 'Entendido',
                        textBody: `${message}`,
                        icon: 'fa-solid fa-xmark',
                        type: 'danger'
                    });
                }
                setLoading(false);
                break;
            case 404:
                console.log('error 404')
                if(retryOnFailure){
                    retryShowData(message, maxRetries, errorCode);
                }else {
                    setModalState({
                        title: 'Ooops!',
                        textBody: `${message? message: 'No se ha podido completar la operacion'}.`,
                        modalId: `modal-error-${errorCode}`,
                        mainButtonText: 'Entendido',
                        openModal: true,
                        type:'danger',
                        icon: 'fa-solid fa-xmark',
                    })
                }
                setLoading(false);
                break;
            case 401:
                console.log(errorCode)
                let extraMessage = '';
                if(errorCode === 'FORB-002'){
                    extraMessage = 'Por favor, revisa tu informacion.';
                }else{
                    extraMessage = 'Inicia sesión nuevamente para continuar.'
                }
                setModalState({
                    title: 'Ooops!',
                    textBody: `${message} ${extraMessage}`,
                    modalId: `modal-error-${errorCode}`,
                    mainButtonText: 'Entendido',
                    openModal: true,
                    type:'danger',
                    icon: 'fa-solid fa-xmark',
                });
                setLoading(false);
                break;
            default:
                setModalState({
                    title: 'Ooops!',
                    textBody: `${message? message + 'Intentalo mas tarde.': 'A ocurrido un error inesperado. Intentalo mas tarde.'}`,
                    modalId: 'modal-error-unexpected',
                    mainButtonText: 'Salir',
                    openModal: true,
                    type:'danger',
                    icon: 'fa-solid fa-xmark',
                });
                setLoading(false);
                break;
        }
    }
    const errorsUniqueness = (message, errorCode, errors) => {
        if(errorCode === 'UNERG-001'){
            errorsUniquenessRegistry(errors, message);
        }else {
            errorsUniquenessAddPhoneNumber();
        }
    };

    const errorsUniquenessRegistry = (errors, message) => {
        let modalErrorState = { openModal: true, title: 'Ooops!', mainButtonText: 'Entendido', type:'danger', icon: 'fa-solid fa-xmark' };
        const findFiled = errors.find((field) => field.field === 'curp' || field.field === 'rfc' || field.field === 'email').field;
        if(findFiled !== 'email') {
            modalErrorState ={
                ...modalErrorState,
                modalId: 'modal-error-field-repeted',
                textBody: `${message} Revisa la información e inténtalo nuevamente.`,
            };
        }
        else {
            modalErrorState = {
                ...modalErrorState,
                textBody: 'Parece que ya existe una cuenta registrada. Si es tuya, intenta iniciar sesión.',
                modalId: 'modal-error-account-already-registered'
            };
        }
        setLoading(false);
        setModalState(modalErrorState);
    }

    const errorsUniquenessAddPhoneNumber = (error) => {
        let newErrorState = {openModal: true, title: 'Ooops!', textBody: '', mainButtonText: 'Reintentar', modalId: '', icon: 'fa-solid fa-triangle-exclamation', type: 'warning'};
        const { errors} = error?.response?.data;
        const findFiled = errors.find((field) => field.field === 'is_primary' || field.field === 'phone_number');
        const field = findFiled?.field;
        const fieldMessage = findFiled?.message;
        if(field === 'is_primary') {
            newErrorState = {
                ...newErrorState,
                textBody: `${fieldMessage} Revisa la información e inténtalo nuevamente.`,
                modalId: 'modal-error-field-repeted',
            }
        }
        else {
            newErrorState = {
                ...newErrorState,
                textBody: `${fieldMessage} Revisa tu informacion e intentalo de nuevo.`,
                modalId: 'modal-error-phone-number-already-registered'
            }
        }
        setModalState(newErrorState);
    }

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        console.log(id)
        switch(id) {
            case 'modal-error-data-primary-button':
                resetModal();
                navigate('/inicio')
                break;
            case 'modal-error-TKE-001-primary-button':
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
            case 'modal-user-biography-updated-success-primary-button':
                resetModal();
                navigate('/perfil-cuenta'); 
                break;
            case 'modal-phone-number-added-success-primary-button':
                resetModal();
                navigate('/datos-contacto/telefonos'); 
                break;
            case 'modal-error-unexpected-primary-button':
                resetModal();
                navigate('/')
                break;
            default:
                resetModal();
                break;
        }
        
    };

   const retryError = (message, maxRetries, errorCode) => {
    let errorAttempt = {
        openModal: true,
        title: 'Error',
        textBody: '',
        modalId: `modal-error-${errorCode}`,
        canUserRetry: true,
        mainButtonText: 'Salir',
        icon: 'fa-solid fa-xmark',
        type: 'danger'
    }
    if(attemptNumber < maxRetries) {
        setAttemptNumber((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: `${message}. ¿Desea reintentarlo?`,
            secondaryButtonText: 'Reintentar',
        };        
    } else {
        setAttemptNumber(0);
        errorAttempt = {
            ...errorAttempt,
            textBody: `${message} Intentelo de nuevo mas tarde.`,
            canUserRetry: false
        };
    }
    setModalState(errorAttempt);
   }

   const retryShowData = (message, maxRetries, errorCode) => {
    let errorAttempt = {
        title: 'Error!',
        textBody: '',
        modalId: `modal-error-data-${errorCode}`,
        mainButtonText: 'Ok',
        secondaryButtonText: 'Reintentar',
        canUserRetry: true,
        openModal: true,
        type: 'danger'
    };
    if(attemptNumber < maxRetries) {
        
        setAttemptNumber((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: `${message? message: 'No se ha podido completar la operacion'}. ¿Desea reintentarlo?`,
        };        
    } else {
        setAttemptNumber(0);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No se pudo completar la operacion. Intentelo de nuevo mas tarde.',
            canUserRetry: false
        };
    }
    setModalState(errorAttempt);
   };

   const retryActionNumber = (action) => {
    let errorAttempt = {
        title: 'Error!',
        textBody: '',
        modalId: `modal-error-${action}-phone-number`,
        mainButtonText: 'Ok',
        secondaryButtonText: 'Reintentar',
        canUserRetry: true
    };
    if(attemptDeleteNumberError < 3) {
        setAttemptDeleteNumberError((prevAttempt) => prevAttempt + 1);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'No fue posible completar la operacion. Inténtalo nuevamente.',
        };        
    } else {
        setAttemptDeleteNumberError(0);
        errorAttempt = {
            ...errorAttempt,
            textBody: 'Lo sentimos no es posible completar la operacion. Intentelo de nuevo mas tarde.',
            canUserRetry: false
        };
    }
    setModalState(errorAttempt);
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
        handleRequest,
        handleCloseModalError,
        resetModal
    };
}

export default useHanleErrorsHook;