import Table from "./Table";
import usePhoneNumbersHook from "../customHooks/usePhoneNumbersHook";
import ModalError from "./ModalError";
import Spinner from "./Spinner";
import { useUserContext } from "../context/UserContext";

function PhoneNumbers(){
    const { phoneNumbers, handleOptionPhoneNumber, handleDeletePhoneNumber, handleRegistryPhoneNumber, retryPhoneNumerModal, handleReturn, handleModalPrimaryButton } = usePhoneNumbersHook();
    const {loading, modalState} = useUserContext();
    return(
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pt-4 pb-4">
                <h1 className='text-primary fw-bold'>Numeros Telefonicos</h1>
            <Table
                phoneNumbers={phoneNumbers}
                handleOptionPhoneNumber={handleOptionPhoneNumber}>
            </Table>
            <div className="container-fluid w-100 d-flex align-items-center justify-content-center gap-5 pt-3">
                <button className="btn btn-primary" type="button" onClick={() => handleRegistryPhoneNumber()}>
                    Registrar Numero Telefonico
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => handleReturn()}>
                    Regresar
                </button>
            </div>
            {loading && (
                <Spinner
                loading = {loading}
                text={''}>
                </Spinner>
            )}
            {modalState.openModal && (
            <ModalError
            icon={modalState.icon}
            type={modalState.type}
            title={modalState.title}
            textBody={modalState.textBody}
            id={modalState.modalId}
            isRetry={modalState.canUserRetry}
            mainButtonText={modalState.mainButtonText}
            secondaryButtonText={modalState.secondaryButtonText}
            handleCloseModalError={handleModalPrimaryButton}
            handleRetry={retryPhoneNumerModal}
            >
            </ModalError>
        )}
        </div>
    );
};

export default PhoneNumbers;