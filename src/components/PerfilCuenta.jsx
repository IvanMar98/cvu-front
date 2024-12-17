import React from 'react';
import Label from "./Label";
import { Link } from "react-router-dom";
import photo_perfil_user from '../assets/img/user.png';
import perfilCuentaHook from '../customHooks/perfil-cuenta-hook';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalError from './ModalError';

function PerfilCuenta() {

    const location = useLocation();
    const { state } = location;
    const { editUserData, errorTokenExpired, handleCloseModalError } = perfilCuentaHook();
    console.log(state)
    const handleEditInfoClick = () => {
        editUserData();
    }
    
    return (
        <div className='container-fluid'>
            <div className="row h-100">
                <div className='col-7'>
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                        <h2>{state.userData.names} {state.userData.first_last_name} {state.userData.second_last_name}</h2>
                        <div className='mt-2 mb-4'>
                            <img src={photo_perfil_user} alt="photo_perfil_user" width='180px' />
                        </div>
                        <div className='d-flex flex-row mb-4 justify-content-center align-items-center'>
                            <h3>Biografia</h3>
                            <Link to={'/perfil-cuenta/biografia'} className = "ms-2">
                                MODIFICAR
                            </Link>
                        </div>
                        <div className='text-center'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque reiciendis saepe non voluptatibus omnis obcaecati quisquam reprehenderit deleniti molestias consectetur nulla dignissimos ipsa iusto a deserunt illo, temporibus cum quas! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate natus dolorem itaque sit, expedita temporibus nobis ipsa quisquam nam, ad, minus architecto numquam exercitationem corporis saepe? Voluptas obcaecati officiis placeat!</p>
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
                                    text = {state.userData.names}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Apellido Paterno"
                                />
                                <Label 
                                    text = {state.userData.first_last_name}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Apellido Materno"
                                />
                                <Label 
                                    text = {state.userData.second_last_name}
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
                                    text = {state?.userData?.gender}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Pais de Nacimiento"
                                />
                                 <Label 
                                    text = {state?.userData?.countryOfBirth}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Fecha de nacimiento"
                                />
                                <Label 
                                    text = {state?.userData?.birthdate}
                                    class = {'text-dark'}
                                />
                            </div>
                        </div>
                        {state.userData.gender === null &&
                            <div>Aun no has llenado tu informacion basica</div>}
                        <div className='h-100 row text-center mt-4'>
                            <h3 className='mb-4'>Claves de registro</h3>
                            <div className='col-6'>
                                <Label 
                                    text = "CURP"
                                />
                                <Label 
                                    text = {state.userData.curp}
                                    class = {'text-dark'}
                                />
                            </div>
                            <div className='col-6'>
                                <Label 
                                    text = "RFC"
                                />
                                <Label 
                                    text = {state.userData.rfc}
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
                errorTokenExpired && (
                <ModalError
                title={'Error'}
                textBody={'Por seguridad, tu sesion ha expirado. Inicia sesion nuevamente para continuar'}
                handleCloseModalError={handleCloseModalError}
                ></ModalError>)
            }
            </div>
        </div>
    )
}

export default PerfilCuenta;