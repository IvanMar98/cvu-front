import React from 'react'

function Input({atributes, handleChange, handleBlur}){

    return (
        <div className=''>
            <input
            className="form-control" 
            name= {atributes.name} 
            type={atributes.type} 
            placeholder = {atributes.placeholder}
            />
        </div>
    )
}

export default Input;