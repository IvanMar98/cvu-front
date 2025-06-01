import React from 'react';
import '../assets/styles/Login.css'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useLoginHook from "../customHooks/useLoginHook";
import Spinner from './Spinner';
import ModalError from './ModalError';
import { useUserContext } from '../context/UserContext';

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset} = useForm();
    const { customSubmit, closeAndResetModalError } = useLoginHook({reset})

    const { modalState, loading  } = useUserContext();

    const handleRegistry = () => {
        navigate('/registrate');
    }

    return (
        <div className="container-form container-md d-flex flex-column align-items-center 
            justify-content-center bg-ligth">
            <div className="mb-4">
                <h1 className="text-primary fw-bold">Acceso a CACEI</h1>
            </div>
            <form onSubmit={handleSubmit(customSubmit)} className=" container w-100 d-flex flex-column align-items-center justify-content-center p-0">
                <input
                    autoFocus
                    className="form-control w-50 mb-5 rounded-3 border border-success p-2 border-opacity-25"
                    type="text"
                    name="email" 
                    placeholder="Ingrese su email"
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
                    })}
                />
                <input
                    className="form-control w-50 mb-5 rounded-3 border border-success p-2 border-opacity-25"
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    {...register('password', {
                        required: true,
                        pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i
                    })}
                />
                <div className="container-form container-md d-flex flex-row align-items-center justify-content-center gap-2">
                    <button className="btn btn-primary">Acceder</button>
                    <button onClick={handleRegistry} className="btn btn-secondary">Registrate</button>
                </div>
            </form>
            {loading && (
                <Spinner
                loading = {loading}
                text = 'Iniciando Sesion . . .'
                ></Spinner>
            )}
            {modalState.openModal && (
                <ModalError
                icon={modalState.icon}
                type={modalState.type}
                title={modalState.title}
                textBody={modalState.textBody}
                mainButtonText={modalState.mainButtonText}
                id={modalState.modalId}
                handleCloseModalError={closeAndResetModalError}>
                </ModalError>
            )}
        </div>
    )
}

export default Login