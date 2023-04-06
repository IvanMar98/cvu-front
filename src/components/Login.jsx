import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container-form container-md d-flex flex-column align-items-center 
            justify-items-center ps-0 pe-0 pt-4 pb-4 mt-3 mb-3 bg-ligth">
            <div className="mb-4">
                <h1 className="text-primary fw-bold">Acceso a CACEI</h1>
            </div>
            <form onSubmit="" className=" container w-100 d-flex flex-column align-items-center justify-content-center p-0">
                <input
                    autoFocus
                    className="form-control w-50 mb-5 rounded-3 border border-success p-2 border-opacity-25"
                    type="text"
                    name="email" 
                    placeholder="Ingrese su email"
                />
                <input
                    className="form-control w-50 mb-5 rounded-3 border border-success p-2 border-opacity-25"
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                />
                <Link to={'/inicio'} className="btn btn-primary">
                    Acceder
                </Link>
                
                <Link to={'/registrate'} className="text-danger mt-3">
                    Resgistrate
                </Link>
            </form>
        </div>
    )
}

export default Login