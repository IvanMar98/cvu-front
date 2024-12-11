import React from 'react';
import Label from "./Label";
import { Link } from "react-router-dom";
import photo_perfil_user from '../assets/img/user.png';
import perfilCuentaHook from '../customHooks/perfil-cuenta-hook';
import { useLocation } from 'react-router-dom';

function PerfilCuenta() {

    const location = useLocation();
    const { state } = location;
    console.log(state)
    
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
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Pais de Nacimiento"
                                />
                            </div>
                            <div className='col-4'>
                                <Label 
                                    text = "Fecha de nacimiento"
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
                                <Link to={'/perfil-cuenta/editar-info'} className="btn btn-info">
                                    Editar Informacion
                                </Link>
                            </div>
                            <div className=''>
                                <Link to={'/inicio'} className="btn btn-primary">
                                    Menu Principal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfilCuenta;