import React from 'react';
import CardItems from './CardItems';
import { Link } from 'react-router-dom';

function DatosLaborales() {
    return (
        <div className='container-fluid d-flex flex-column align-items-center pt-4 pb-4'>
            <div>
                <h1 className='text-primary fw-bold mb-5'>Datos Laborales</h1>
            </div>
            <div className='container-fluid d-flex justify-content-between'>
                <Link to={'/datos-laborales/adscripcion-tecnm'} className = "text-decoration-none text-dark">
                    <CardItems 
                        icon="fa-solid fa-building-columns" 
                        title="Adscripcion a TECNM"
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

export default DatosLaborales;