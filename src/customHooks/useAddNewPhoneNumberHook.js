import { useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { postPhoneNumber } from "../services/userPhoneNumbers/postPhoneNumber";
import { getModalById, retryOperation, getModalCloseAction } from "../utils/moodalConfig";

const useAddNewPhoneNumberHook = () => {
    const { setLoading, setModalState, modalState} = useUserContext();
    const lastFormData = useRef(null);
    const navigate = useNavigate();
    const [ attemptNumber, setAttemptNumber ] = useState(0);

    const registerPhoneNumber = async (data) => {
        lastFormData.current = data;
        try {
            setLoading(true);
            setModalState( {openModal: false} );
            const response = await postPhoneNumber({
                phone_number: data.phoneNumber,
                phone_type: data.type,
                is_primary: data.is_primary
            });
            if(response.status === 'success') {
                setTimeout(() => {
                    setLoading(false);
                    const modalConfigBase = getModalById('NUMBER-ADDED-SUCCESS');
                    const modalConfigCopy = { ...modalConfigBase, openModal: true };
                    setModalState(modalConfigCopy);
                },1000)
            }
        } catch (error) {
            const { errorCode, errors } = error?.response?.data || {};
            const [{ field } = {}] = errors || [];
            const modalConfigBase = getModalById(errorCode);
            const modalConfigCopy = { ...modalConfigBase, openModal: true};
            if(field){
                errorsUniquenessPhoneNumber(field, modalConfigCopy);
            }
            const { attemptNumber: newAttempt, modalConf: updatedConf } = retryOperation(modalConfigCopy, attemptNumber);
            setAttemptNumber(newAttempt);
            setTimeout(() => {
                setLoading(false);
                setModalState(updatedConf);
            },1000)
        }
    }

    const errorsUniquenessPhoneNumber = (field, modalConf) => {
        if (field === 'phone_number') {
            modalConf.textBody = 'Revisa la información e inténtalo nuevamente.'
        } else {
            modalConf.textBody = 'Este usuario ya tiene un número principal. Revisa la información e inténtalo nuevamente.'
        }
        modalConf.modalId = 'modal-error-UNERG-001';
    }

    const retryRegisterPhoneNumber = () => {
        if (lastFormData.current) {
            registerPhoneNumber(lastFormData.current);
        }
    };

    const handleReturn = () => {
        navigate('/datos-contacto/telefonos')
    }

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if(closeCase?.navigate){
            const navigateTo = closeCase.navigateTo? closeCase.navigateTo : '/datos-contacto/telefonos'
            navigate(`${navigateTo}`);  
        }
        setModalState(getModalById('CLEAN-MODAL'));
    }

    return {
        registerPhoneNumber,
        handleCloseModalError,
        retryRegisterPhoneNumber,
        handleReturn
    }
}

export default useAddNewPhoneNumberHook;