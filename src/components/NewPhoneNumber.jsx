import { useForm } from "react-hook-form";
import Label from "./Label";
import useAddNewPhoneNumberHook from "../customHooks/useAddNewPhoneNumberHook";
import ModalError from "./ModalError";
import { useUserContext } from "../context/UserContext";
import Spinner from "./Spinner";
function NewPhoneNumber() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {loading, modalState} = useUserContext();

    const { registerPhoneNumber,handleCloseModalError, retryRegisterPhoneNumber, handleReturn } = useAddNewPhoneNumberHook();
    return (
        <div className="container-fluid d-flex flex-column justify-content-center">
            <h1 className="mb-5 text-primary fw-bold text-center">Agregar numero telefonico</h1>
            <form className="d-flex flex-column container" onSubmit={handleSubmit(registerPhoneNumber)}>
                <div className="row w-100">
                    <div className="d-flex flex-column col-4">
                        <Label
                            text={"Numero Telefonico"}>
                        </Label>
                        <input 
                            type="text" 
                            placeholder="Ingresa numero telefonico"
                            className="form-control form-select-sm"
                            {...register('phoneNumber', {
                                required: true,
                                pattern:  /^\d{10}$/
                            })}
                        />
                        {errors.phoneNumber?.type === 'required' && <small className="fail p-0">*El campo es requerido.</small>}
                        {errors.phoneNumber?.type === 'pattern' && <small className="fail">*Numero invalido.</small>}
                    </div>
                    <div className="d-flex flex-column col-4">
                        <Label
                            text={"Type"}>
                        </Label>
                        <select 
                            className="form-select form-select-sm"
                            {...register('type', {
                                required: true
                            })}>
                                <option value="Home"></option>
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Mobile">Mobile</option>
                        </select>
                        {errors.phoneNumber?.type === 'required' && <small className="fail p-0">*El campo es requerido.</small>}
                    </div>
                    <div className="d-flex flex-column col-4 align-items-center">
                        <Label
                            text={"Principal"}>
                        </Label>
                        <input
                            type="checkbox"
                            {...register('is_primary', {

                            })}
                        />
                        
                    </div>
                </div>
                <div className="container d-flex gap-5 justify-content-center">
                    <button type="submit" className="btn btn-primary mt-5">
                        Registrar
                    </button>
                    <button type="button" className="btn btn-secondary mt-5" onClick={handleReturn}>
                        Cancelar
                    </button>
                </div>
                {
                    loading && (
                        <Spinner
                        loading = {loading}
                        text={''}>
                        </Spinner>
                    )
                }
                {
                    modalState.openModal && (
                        <ModalError
                        icon={modalState.icon}
                        type={modalState.type}
                        title={modalState.title}
                        textBody={modalState.textBody}
                        id={modalState.modalId}
                        isRetry={modalState.canUserRetry}
                        mainButtonText={modalState.mainButtonText}
                        secondaryButtonText={modalState.secondaryButtonText}
                        handleCloseModalError={handleCloseModalError}
                        handleRetry={retryRegisterPhoneNumber}
                        >
                        </ModalError>
                    )
                }
            </form>
        </div>

    );
};

export default NewPhoneNumber;