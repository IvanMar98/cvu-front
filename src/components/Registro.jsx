import Spinner from "./Spinner";
import Label from "./Label";
import ModalError from "./ModalError";
import '../assets/styles/Registro.css'
import { useForm } from 'react-hook-form';
import { useState } from "react";
import useRegistryHook from "../customHooks/useRegistryHook";
import { useUserContext } from "../context/UserContext";

const Registro = () => {

    const [ acceptTermsAndConditions, setAcceptTermsAndConditions ] = useState(false);
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm();
    const { customSubmit, handleCloseModalError, retryRegistry, handleCancelRegistry } = useRegistryHook({acceptTermsAndConditions});

    const { modalState, loading  } = useUserContext();
    const handleCheckBoxTermsAndConditions = (event) => {
        const isAccepted = event.target.checked;
        setAcceptTermsAndConditions(isAccepted);
    }

    return (
        <div className="registro container-fluid d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-3 text-primary fw-bold">Formulario de Registro</h1>
            <form onSubmit={handleSubmit(customSubmit)} className="container d-flex flex-column align-items-center fw-bold">
                <div className="container_datos_basicos container mt-4 ps-4 pe-4 pt-1 text-secondary">
                    <p className="title_datos_basicos text-primary fw-bold mt-2 mb-3">Datos Personales Basicos </p>
                    <div className="row container__inputs">
                        <div className="d-flex flex-column col-4">
                            <Label
                                text="Nombres:"
                            />
                            <input className="form-control"
                                placeholder='Ingrese su nombre(s)'
                                {...register('names', {
                                    required: true,
                                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/i
                                })}
                            />
                            {errors.names?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                            {errors.names?.type === 'pattern' && <small className="fail">*No se permiten caracteres especiales o numeros.</small>}
                        </div>
                        <div className="d-felx flex-column col-4">
                            <Label
                                text="Apellido Paterno:"
                            />
                            <input className="form-control"
                                placeholder='Ingrese su apellido paterno'
                                {...register('firstLastName', {
                                    required: true,
                                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/i
                                })}
                            />
                            {errors.firstLastName?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                            {errors.firstLastName?.type === 'pattern' && <small className="fail">*No se permiten caracteres especiales o numeros.</small>}
                        </div>
                        <div className="d-felx felx-column col-4">
                            <Label
                                text="Apellido Materno:"
                            />
                            <input
                                className="form-control"
                                placeholder='Ingrese su apellido materno'
                                {...register('secondLastName', {
                                    required: true,
                                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/i
                                })}
                            />
                            {errors.secondLastName?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                            {errors.secondLastName?.type === 'pattern' && <small className="fail">*No se permiten caracteres especiales o numeros.</small>}
                        </div>
                    </div>
                    <div className="row container__inputs">
                        <div className="d-felx flex-column col-6">
                            <Label
                                text="CURP:"
                            />
                            <input
                                className="form-control"
                                placeholder='Ingrese los 18 digitos'
                                {...register('curp', {
                                    required: true,
                                    pattern: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/i
                                })}
                            />
                            {errors.curp?.type === 'required' && <small className="fail">*El campo es requerido.</small>}
                            {errors.curp?.type === 'pattern' && <small className="fail">*CURP Invalida.</small>}
                        </div>
                        <div className="d-felx flex-column col-6">
                            <Label
                                text="RFC:"
                            />
                            <input
                                className="form-control"
                                placeholder='Ingrese su RFC completo con homoclave'
                                {...register('rfc', {
                                    required: true,
                                    pattern: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/i
                                })}
                            />
                            {errors.rfc?.type === 'required' && <small className="fail">*El campo es requerido.</small>}
                            {errors.rfc?.type === 'pattern' && <small className="fail">*RFC Invalida.</small>}
                        </div>
                    </div>
                </div>
                <div className="container_datos_cuenta container mt-1 mb-1  ps-4 pe-4 pt-1 pb-5 text-secondary">
                    <p className="title_cuenta text-primary fw-bold mt-2 mb-3">Datos Cuenta CACEI </p>
                    <div className="row container__inputs">
                        <div className="d-felx flex-column col-6">
                            <Label
                                text="Correo electronico:"
                            />
                            <input
                                className="form-control"
                                placeholder='Ejemplo: nombre@ejemplo.com'
                                {...register('email', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
                                })}
                            />
                            {errors.email?.type === 'required' && <small className="fail">*El campo es requerido.</small>}
                            {errors.email?.type === 'pattern' && <small className="fail">*Email Invalido.</small>}
                        </div>
                        <div className="d-felx flex-column col-6">
                            <Label
                                text="Contraseña:"
                            />
                            <input
                                className="form-control"
                                placeholder='Ingresar una contraseña'
                                type="password"
                                {...register('password', {
                                    required: true,
                                    pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i
                                })}
                            />
                            {errors.password?.type === 'required' && <small className="fail">*El campo es requerido.</small>}
                            {errors.password?.type === 'pattern' && <small className="fail">*Email Invalido.</small>}
                        </div>
                    </div>
                </div>
                <div className="form-check mb-3 ">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        onChange={handleCheckBoxTermsAndConditions}
                    />
                    <label className="form-check-label text-secondary " htmlFor="flexCheckDefault">
                        Acepto que la información proporcionada es real y correcta.
                    </label>
                </div>
                <div className="container-buttons-registry">
                    <button type="submit" className="btn btn-primary">Registrate</button>
                    <button type="button" className="btn btn-danger" onClick={() => {handleCancelRegistry(isDirty)}}> Cancelar</button>
                </div>
            </form>
            {loading && (
                <Spinner
                loading = {loading}
                text={'Registrando, espere por favor . . .'}
                ></Spinner>
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
                handleCloseModalError={handleCloseModalError}
                handleRetry={retryRegistry}>
                </ModalError>
            )}
        </div>
    )
}

export default Registro;