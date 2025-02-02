import React, { useState } from 'react';
import Label from "./Label";
import { Link, useNavigate } from "react-router-dom";
import usePerfilCuentaHook from '../customHooks/usePerfilCuentaHook';
import ModalError from './ModalError';
import ImageProfile from './ImageProfile';
import { useUserContext } from '../context/UserContext';
import Spinner from './Spinner';

function PerfilCuenta() {
    const {handleCloseModalError, updateImageProfile, getUserData } = usePerfilCuentaHook();

    const { userData, modalState, loading } = useUserContext();
    const navigate = useNavigate();

    const handleEditInfoClick = () => {
        navigate('/perfil-cuenta/editar-info');
    }

    const handleImageChange = async (e) => {
        const image = e.currentTarget.files[0];
        if(image) {
            await updateImageProfile(image);
        }
        e.target.value = '';
    }
    
    return (
        <div className='container-fluid'>
            <div className="row h-100">
                <div className='col-7'>
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                        <h2>{userData?.names} {userData?.first_last_name} {userData?.second_last_name}</h2>
                        <ImageProfile
                        image= {userData?.image_profile}
                        handleImageChange={handleImageChange}></ImageProfile>
                    
                        <div className='d-flex flex-row mb-4 justify-content-center align-items-center'>
                            <h3>Biografia</h3>
                            <Link to={'/perfil-cuenta/biografia'} className = "ms-2">
                                MODIFICAR
                            </Link>
                        </div>
                        <div className='text-center'>
                        <div dangerouslySetInnerHTML={{__html: userData?.biography}}></div>
                        {userData?.biography === null &&
                            <div className='bg-warning'>Cuentanos un poco de ti . . .</div>}
                        </div>
                    </div>
                </div>
                <div className='col-5 border-start'>
                    <div className="h-100 d-flex flex-column justify-content-center">
                        <h3 className='h-100 d-flex justify-content-center align-items-center'>Datos Personales</h3>
                        <div className='h-100 row text-center mt-4 text-primary'>
                            <div className='col-4'>
                                <Label
                                    text = "Nombre(s)"
                                />
                                <Label
                                    text = {userData?.names}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Apellido Paterno"
                                />
                                <Label 
                                    text = {userData?.first_last_name}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Apellido Materno"
                                />
                                <Label 
                                    text = {userData?.second_last_name}
                                    class = {'text-dark'}
                                />
                            </div>
                        </div>
                        <div className='h-100 row text-center mt-4'>
                            <h3 className='mb-4'>Informacion Basica</h3>
                            <div className='col-4'>
                                <Label 
                                    text = "Sexo"
                                />
                                <Label 
                                    text = {userData?.gender}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Pais de Nacimiento"
                                />
                                 <Label 
                                    text = {userData?.countryOfBirth}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Fecha de nacimiento"
                                />
                                <Label 
                                    text = {userData?.birthdate}
                                    class = {'text-dark'}
                                />
                            </div>
                        </div>
                        {userData?.gender === null &&
                            <div className='bg-warning text-center'>Aun no has llenado tu informacion basica</div>}
                        <div className='h-100 row text-center mt-4'>
                            <h3 className='mb-4'>Claves de registro</h3>
                            <div className='col-6'>
                                <Label 
                                    text = "CURP"
                                />
                                <Label 
                                    text = {userData?.curp}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-6'>
                                <Label 
                                    text = "RFC"
                                />
                                <Label 
                                    text = {userData?.rfc}
                                    class = {'text-dark'}
                                />
                            </div>
                        </div>
                        <div className='h-100 container-fluid d-flex justify-content-around mt-5'>
                            <div className=''>
                                <button onClick={handleEditInfoClick} className="btn btn-info">
                                    Editar Informacion
                                </button>
                            </div>
                            <div className=''>
                                <Link to={'/inicio'} className="btn btn-primary">
                                    Menu Principal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading && (
                    <Spinner
                            loading = {loading}
                            text={''}
                        >
                    </Spinner> 
                    )
                }
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
                handleCloseModalError={handleCloseModalError}
                handleRetry={getUserData}
                ></ModalError>)
            }
            </div>
        </div>
    )
}

export default PerfilCuenta;