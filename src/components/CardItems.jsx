import React from 'react';
import '../assets/styles/CardItems.css'

function CardItems(props){
    return (
    <div className='card mb-3 d-flex justify-content-center ps-3 pe-3'>
        <div className='row d-flex align-items-center'>
            <div className='col-4'>
                <i className= {`text-primary ${props.icon}`}></i>
            </div>
            <div className='col-8 text-decoration-none'>
                {props.title}
            </div>
        </div>
    </div>
    )
}

export default CardItems;