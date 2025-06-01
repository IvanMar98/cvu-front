import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { newRegistry } from "../services/records/postRecord";
import { useUserContext } from "../context/UserContext";
import { getModalById, getModalCloseAction, retryOperation } from "../utils/moodalConfig";

const useRegistryHook = ({ acceptTermsAndConditions }) => {
    const navigate = useNavigate();
    const { setLoading, setModalState } = useUserContext();
    const lastRegistryData = useRef();
    const [attemptNumber, setAttemptNumber] = useState(0);

    const customSubmit = async (data) => {
        lastRegistryData.current = data;
        const { names, firstLastName, secondLastName, curp, rfc, email, password } = data;
        setModalState({ openModal: false });
        setLoading(true);
        try {
            if (!acceptTermsAndConditions) {
                setLoading(false);
                throw ({
                    response: {
                        data: {
                            errorCode: 'TNA-001'
                        }
                    },
                })
            }
            const response = await newRegistry({ names, firstLastName, secondLastName, curp, rfc, email, password })
            if (response.status === 'success') {
                setLoading(false);
                const successModalRegistryBase = getModalById('SUCCESS-REG-001');
                const successModalRegistry = { ...successModalRegistryBase, openModal: true };
                setModalState(successModalRegistry);
            }
        } catch (error) {
            const { errorCode, errors } = error?.response?.data || {};
            const [{ field } = {}] = errors || [];
            const baseModal = getModalById(errorCode);
            let modalConf = { ...baseModal, openModal: true };
            const { attemptNumber: newAttempt, modalConf: updatedConf } = retryOperation(modalConf, attemptNumber);
            setAttemptNumber(newAttempt);
            retryOperation(updatedConf);
            if (field) {
                errorsUniquenessRegistry(field, updatedConf);
            }
            setTimeout(() => {
                setLoading(false);
                setModalState(updatedConf);
            }, 500)
        }
    }

    const errorsUniquenessRegistry = (field, modalConf) => {
        if (field === 'email') {
            modalConf.textBody = 'Parece que ya existe una cuenta registrada. Si es tuya, intenta iniciar sesión.'
            modalConf.modalId = 'modal-error-UNERG-002'
        } else {
            modalConf.textBody = 'Revisa la información e inténtalo nuevamente.'
            modalConf.modalId = 'modal-error-UNERG-001'
        }
    }

    const retryRegistry = (e) => {
        const { id } = e.currentTarget;
        if (id === 'modal-registry-are-user-sure-to-leave-secondary-button') {
            setModalState(getModalById('CLEAN-MODAL'))
        } else {
            if (lastRegistryData.current) {
                setLoading(true);
                customSubmit(lastRegistryData.current);
            }
        }
    }

    const handleCancelRegistry = (isDirty) => {
        if (isDirty) {
            const modalCancelRegistryBase = getModalById('CANCEL-REGISTRY');
            const modalCancelRegistry = { ...modalCancelRegistryBase, openModal: true };
            setModalState(modalCancelRegistry)
        } else {
            navigate('/');
        }
    }

    const handleCloseModalError = (e) => {
        const { id } = e.currentTarget;
        const closeCase = getModalCloseAction(id);
        if (closeCase?.navigate) {
            navigate('/')
        };
        setModalState(getModalById('CLEAN-MODAL'));
    }

    return {
        customSubmit,
        handleCloseModalError,
        retryRegistry,
        handleCancelRegistry
    }
}

export default useRegistryHook;