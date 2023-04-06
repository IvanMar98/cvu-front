import React from 'react'
import CardItems from './CardItems'
import { Link } from 'react-router-dom';

function DatosContacto(){
    return (
        <div className='container-fluid d-flex flex-column align-items-center pt-4 pb-4'>
            <div>
                <h1 className='text-primary fw-bold mb-5'>Datos de Contacto</h1>
            </div>
            <div className='container-fluid d-flex justify-content-around'>
                <Link to={'/datos-contacto/telefonos'} className = "text-decoration-none text-dark">
                    <CardItems 
                        icon="fa-solid fa-phone" 
                        title="Telefonos"
                    />
                </Link>
                <Link to={'/datos-contacto/correos'} className = "text-decoration-none text-dark">
                    <CardItems 
                        icon="fa-solid fa-envelope" 
                        title="Correos Electronicos"
                    />
                </Link>
                <Link to={'/datos-contacto/direccion'} className = "text-decoration-none text-dark">
                    <CardItems 
                        icon="fa-solid fa-map" 
                        title="Direccion"
                    />
                </Link>
            </div>
            <div className='container-flulid mt-4'>
            <Link to={'/inicio'} className = "btn btn-primary">
                Menu Principal    
            </Link>
            </div>
        </div>
    )
}

export default DatosContacto;