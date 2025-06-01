import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { deletePhoneNumber } from "../services/userPhoneNumbers/deletePhoneNumber";
import { getPhoneNumbers } from "../services/userPhoneNumbers/getPhoneNumbers";
import { usePhoneNumberContext } from "../context/PhoneNumberContext";
import { useNavigate } from "react-router-dom";
import { getModalById, retryOperation, getModalCloseAction } from "../utils/moodalConfig";

const usePhoneNumbersHook = () => {
    const { setPhoneNumber, phoneNumber } = usePhoneNumberContext();
    const { setLoading, setModalState} = useUserContext();
    const [ phoneNumbers, setPhoneNumbers ] = useState([]);
    const navigate = useNavigate();
    const [ attemptNumber, setAttemptNumber ] = useState(0);

    const getUserPhoneNumbers = async () => {
        setLoading(true);
        setModalState({ openModal: false });
        try {
            let response = await getPhoneNumbers();
            if(response.status === 'success' && response.data) {
                const operations = {
                    options: {
                        edit: {
                            icon: 'fa-solid fa-pen-to-square',
                            class: 'text-primary'
                        },
                        delete: 
                        {
                            icon: 'fa-solid fa-trash',
                            class: 'text-danger'
                        }
                    }
                };
                response.data.forEach(element => {
                    Object.assign(element, operations);
                });
                setTimeout(() => {
                    setLoading(false)
                    setPhoneNumbers(response.data);
                },500)
            }else{
                setTimeout(() => {
                    setLoading(false);
                    setPhoneNumbers([])
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

    const handleDeletePhoneNumber = async () => {
        setLoading(true);
        setModalState({ openModal: false });
        try {
            const response = await deletePhoneNumber(phoneNumber.phone_number_id);
            if(response.status === 'success'){
                setTimeout(() => {
                    setLoading(false);
                    const modalBase = getModalById('DELETE-NUMBER-SUCCESS');
                    const modalConfigCopy = { ...modalBase, openModal: true };
                    setModalState(modalConfigCopy)
                },500);
            }
        } catch (error) {
            const { errorCode } = error?.response?.data || {};
            let modalConfigBase;
            if(errorCode === 'PHONE-NUMBER-IS-REQUIRED-001' || errorCode === 'USER-IS-REQUIRED-001'){
                modalConfigBase = getModalById('FIELD-REQUIRED');
            }else {
                modalConfigBase = getModalById(errorCode);
            }
            const modalConfigCopy = { ...modalConfigBase, openModal: true};
            const { attemptNumber: newAttempt, modalConf: updatedConf } = retryOperation(modalConfigCopy, attemptNumber);
            setAttemptNumber(newAttempt);
            setTimeout(() => {
                setLoading(false);
                setModalState(updatedConf);
            },1000);
        }
    };

    const handleOptionPhoneNumber = (event, index) => {
        const  { id } = event.currentTarget;
        setPhoneNumber(phoneNumbers[index]);
        if(id === 'edit-option-phone-number'){
            navigate('/datos-contacto/telefonos/editar-telefono');
        }else{
            const modalBase = getModalById('DELETE-PHONE-NUMBER');
            const modalCopy = { ...modalBase, openModal: true};
            setModalState(modalCopy);
        }
    };

    const retryPhoneNumerModal = (e) => {
        e.stopPropagation();
        const { id } = e.currentTarget;
        if(id === 'modal-error-UNF-002-secondary-button') {
            getUserPhoneNumbers();
        } else if(id === 'modal-delete-phone-number-secondary-button'){
            setModalState(getModalById('CLEAN-MODAL'));
        } else if(id === 'modal-error-PNNF-001-secondary-button' || id === 'modal-error-UNF-004-secondary-button') {
            handleDeletePhoneNumber();
        }
    };

    const handleModalPrimaryButton = (e) => {
        const { id } = e.currentTarget;
        if(id === 'modal-delete-phone-number-primary-button'){
            handleDeletePhoneNumber();
        }else if(id === 'modal-phone-number-deleted-success-primary-button'){
            getUserPhoneNumbers();
        }else {
            handleCloseModalError(id);
        }
    }

    const handleCloseModalError = (id) => {
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            const navigateTo = closeCase.navigateTo? closeCase.navigateTo : '/datos-contacto'
            navigate(`${navigateTo}`);  
        }
        setModalState(getModalById('CLEAN-MODAL'));
    }

    const handleRegistryPhoneNumber = () => {
        navigate('/datos-contacto/telefonos/nuevo-telefono')
    }

    const handleReturn = () => {
        navigate('/datos-contacto')
    }

    useEffect(() => {
      getUserPhoneNumbers();
    }, []);
    

    return {
        handleDeletePhoneNumber,
        phoneNumbers,
        retryPhoneNumerModal,
        handleOptionPhoneNumber,
        handleRegistryPhoneNumber,
        handleReturn,
        handleModalPrimaryButton
    }
}

export default usePhoneNumbersHook;