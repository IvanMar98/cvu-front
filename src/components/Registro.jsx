import { Link } from "react-router-dom";
import Label from "./Label";
import Input from "./Input";

const Registro = () => {
    return (
        <div className="registro container-fluid d-flex flex-column align-items-center mt-3 mb-5">
            <h1 className="mt-3 text-primary fw-bold">Formulario de Registro</h1>
            <form className ="container d-flex flex-column align-items-center fw-bold">
                <div className="container_datos_basicos container mt-4 ps-4 pe-4 pt-1 pb-5 text-secondary">
                    <p className="title_datos_basicos text-primary fw-bold mt-2 mb-3">Datos Personales Basicos </p>
                    <div className="row">
                        <div className="d-grid gap-1 col-4">
                            <Label 
                                text = "Nombres:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'name',
                                        type: 'text',
                                        placeholder: 'Ingrese su nombre(s)'
                                    }
                                }
                            />
                        </div>
                        <div className="d-grid gap-1 col-4 ">
                            <Label 
                                text = "Apellido Paterno:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'apellidoP',
                                        type: 'text',
                                        placeholder: 'Ingrese su apellido paterno'
                                    }
                                }
                            />
                        </div>
                        <div className="d-grid gap-1 col-4">
                            <Label 
                                text = "Apellido Materno:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'apellidoM',
                                        type: 'text',
                                        placeholder: 'Ingrese su apellido materno'
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "CURP:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'curp',
                                        type: 'text',
                                        placeholder: 'Ingrese los 18 digitos'
                                    }
                                }
                            />
                        </div>
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "RFC:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'rfc',
                                        type: 'text',
                                        placeholder: 'Ingrese su RFC completo con homoclave'
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="container_datos_cuenta container mt-1 mb-1  ps-4 pe-4 pt-1 pb-5 text-secondary">
                    <p className="title_cuenta text-primary fw-bold mt-2 mb-3">Datos Cuenta CACEI </p>
                    <div className="row">
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "Correo electronico:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'email',
                                        type: 'text',
                                        placeholder: 'Ejemplo: nombre@ejemplo.com'
                                    }
                                }
                            />
                        </div>
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "Confirmar correo:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'email-comfirm',
                                        type: 'text',
                                        placeholder: 'Volver a introducio el correo electronico'
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "Contraseña:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'password',
                                        type: 'password',
                                        placeholder: 'Ingresar una contraseña'
                                    }
                                }
                            />
                        </div>
                        <div className="d-grid gap-1 col-6">
                            <Label 
                                text = "Confirmar contraseña:"
                            />
                            <Input 
                                atributes = {
                                    {
                                        name: 'password-comfirm',
                                        type: 'password',
                                        placeholder: 'Ingresar de nuevo la contraseña'
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="form-check mb-3 ">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label text-secondary " htmlFor="flexCheckDefault">
                        Acepto que la información proporcionada es real y correcta.
                    </label>
                </div>
                <Link to={'/'} className="btn btn-primary">
                    Resgistrate
                </Link>
            </form>
        </div>
    )
}

export default Registro;