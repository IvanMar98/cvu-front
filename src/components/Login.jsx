import React from 'react';
import '../assets/styles/Login.css'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { postLogin } from '../services/login/login';
import Spinner from './Spinner';

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const handleRegistry = () => {
        navigate('/registrate');
    }

    const customSubmit = async(data) => {

        const { email, password } = data;
        setLoading(true);
        try {
        const response = await postLogin({email, password});
        if(response.status.code === 200) {
            setTimeout(() => {
                setLoading(false);
                localStorage.setItem('userToken', response.data.token);
                navigate('/inicio');
            },2000)
        }else {
            setTimeout(() => {
                setLoading(false);
                alert('Error al iniciar la sesion, verifica tu informacion');
            },2000)
        }
        } catch (error) {
        console.error('Error en el Login:', error);
        alert('Hubo un problema inesperado. Inténtalo más tarde.');
        }
    }

    return (
        <div className="container-form container-md d-flex flex-column align-items-center 
            justify-items-center ps-0 pe-0 pt-4 pb-4 mt-3 mb-3 bg-ligth">
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
                <div className='options-container'>
                    <button className="btn btn-primary">Acceder</button>
                    <button onClick={handleRegistry} className="btn btn-primary">Registrate</button>
                </div>
            </form>
            {loading && (
                <Spinner
                loading = {loading}
                text = 'Iniciando Sesion . . .'
                ></Spinner>
            )}
        </div>
    )
}

export default Login