import { useForm } from "react-hook-form";
import Label from "./Label";
import useEditUserInfoHook from "../customHooks/useEditUserInfoHook.js";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Spinner from "./Spinner.jsx";
import ModalError from "./ModalError.jsx";

function EditInfo(){
    const { handleCloseModalError, updateUserInfo, editUserInfo, handleCancelEditInfo} = useEditUserInfoHook();
    const { loading, modalState } = useUserContext();

    const { userData, countries } = useUserContext();
    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
        defaultValues: {
            names: "",
            firstLastName: "",
            secondLastName: "",
            birthdate: "",
            curp: "",
            rfc: "",
            gender: "",
            countryOfBirth: ""
        }
    });

    useEffect(() => {
        if(userData) {
            const formattedDate = userData.birthdate
            ? new Date(userData.birthdate).toISOString().split("T")[0]
            : "";

        reset({
            names: userData.names || "",
            firstLastName: userData.first_last_name || "",
            secondLastName: userData.second_last_name || "",
            birthdate: formattedDate, // Fecha en formato YYYY-MM-DD
            curp: userData.curp || "",
            rfc: userData.rfc || "",
            gender: userData.gender || "",
            countryOfBirth: userData.countryOfBirth || ""
        }); 
        }
    }, [userData, reset])

    return(
        <div className="container-fluid">
            <form onSubmit={handleSubmit(updateUserInfo)} className="container d-flex flex-column align-items-center fw-bold h-100">
                <div className="container_datos_basicos container mt-4 ps-4 pe-4 pt-1 text-secondary">
                    <p className="title_datos_basicos text-primary fw-bold mt-2 mb-3">Datos Personales </p>
                    <div className="row container__inputs">
                        <div className="d-flex flex-column col-4">
                            <Label
                                text="Nombres:"
                            />
                            <input className="form-control"
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
                                {...register('secondLastName', {
                                    required: true,
                                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/i
                                })}
                            />
                            {errors.secondLastName?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                            {errors.secondLastName?.type === 'pattern' && <small className="fail">*No se permiten caracteres especiales o numeros.</small>}
                        </div>
                    </div>
                    <p className="title_datos_basicos text-primary fw-bold mt-2 mb-3">Informacion Basica</p>
                    <div className="row container__inputs">
                        <div className="d-flex flex-column col-4">
                            <Label
                                text="Sexo:"
                            />
                            <select
                            className="form-select"
                            name="genders"
                            id="genders"
                            {...register('gender', { required: true })}
                            >
                                <option value="" disabled>Seleccione una opcion</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option> 
                            </select>
                            {errors.gender?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                        </div>
                        <div className="d-felx flex-column col-4">
                            <Label
                                text="Pais de nacimiento:"
                            />
                            <select 
                            className="form-select"
                            name="countryOfBirth"
                            id="countryOfBirth"
                            {...register('countryOfBirth', { required: true })}
                            >
                                <option value="" disabled>Seleccione un país</option>
                                {countries.map((country) => (
                                     <option key={country.id_pais} value={country.id_pais}>{country.nombre_pais}</option>
                                ))}
                            </select>
                            {errors.countryOfBirth?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                        </div>
                        <div className="d-felx felx-column col-4">
                            <Label
                                text="Fecha de Nacimiento:"
                            />
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                className="form-control"
                                {...register('birthdate', {
                                    required: true
                                })}
                            />
                            {errors.birthdate?.type === 'required' && <small className="fail">*El campo es requerido</small>}
                        </div>
                    </div>
                    <p className="title_datos_basicos text-primary fw-bold mt-2 mb-3">Claves de Registro</p>
                    <div className="row container__inputs">
                        <div className="d-flex flex-column col-6">
                            <Label
                                text="CURP:"
                            />
                            <input
                                className="form-control"
                                {...register('curp', {
                                    required: true,
                                    pattern: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/i
                                })}
                            />
                             {errors.curp?.type === 'required' && <small className="fail">*El campo es requerido.</small>}
                             {errors.curp?.type === 'pattern' && <small className="fail">*CURP Invalida.</small>}
                        </div>
                        <div className="d-flex flex-column col-6">
                            <Label
                                text="RFC:"
                            />
                            <input
                                className="form-control"
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
                <div className="d-flex w-100 justify-content-around align-items-center h-100">
                    <button type="submit" className="btn btn-primary" disabled = {!isDirty} >Actualizar Informacion</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleCancelEditInfo(isDirty)}>Cancelar</button>
                </div>
            </form>
            {loading && (
                <Spinner
                loading = {loading}
                text={''}
                ></Spinner>
            )}
            {
                modalState.openModal && (
                <ModalError
                title={modalState.title}
                textBody={modalState.textBody}
                id={modalState.modalId}
                isRetry={modalState.canUserRetry}
                type={modalState.type}
                icon={modalState.icon}
                mainButtonText={modalState.mainButtonText}
                secondaryButtonText={modalState.secondaryButtonText}
                handleCloseModalError={handleCloseModalError}
                handleRetry={handleCloseModalError}
                ></ModalError>)
            }
        </div>
    );
};

export default EditInfo;