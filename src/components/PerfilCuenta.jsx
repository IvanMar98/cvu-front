import React from 'react';
import Label from "./Label";
import { Link } from "react-router-dom";
import photo_perfil_user from '../assets/img/user.png';

function PerfilCuenta() {
    return (
        <div className='container- fluid'>
            <div className="row">
                <div className='col-8 pt-4 pb-5 ps-5 pe-5'>
                    <div className="d-flex flex-column align-items-center">
                        <h2>Nombre User</h2>
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
                <div className='col-4 border-start pt-4 pb-5'>
                <div className="text-center">
                    <h3>Datos Personales</h3>
                    <div className='row text-center mt-4 text-primary'>
                        <div className='col-4'>
                            <Label
                                text = "Nombre(s)"
                            />
                        </div>
                        <div className='col-4'>
                            <Label 
                                text = "Apellido Paterno"
                            />
                        </div>
                        <div className='col-4'>
                            <Label 
                                text = "Apellido Materno"
                            />
                        </div>
                    </div>
                    <div className='row text-center mt-4'>
                        <h5 className='mb-4'>Informacion Basica</h5>
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
                    <div className='row text-center mt-4'>
                        <h5 className='mb-4'>Claves de registro</h5>
                        <div className='col-6'>
                            <Label 
                                text = "CURP"
                            />
                        </div>
                        <div className='col-6'>
                            <Label 
                                text = "RFC"
                            />
                        </div>
                    </div>
                    <div className='container-fluid d-flex justify-content-around mt-5'>
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