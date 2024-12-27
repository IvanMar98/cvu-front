import React from 'react';
import '../assets/styles/ImageProfile.css'


function ImageProfile({image, handleImageChange}) {
    
    return (
        <div className='container container-fluid d-flex flex-column align-items-center'>
            <figure className='position-relative overflow-hidden'>
                <img src={image} alt="photo_perfil_user" className='w-100 h-100'/>
                <div className='layer position-absolute top-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
                    <label htmlFor='input-image' className='w-100 label-image fs-3 text-light'>Cambiar foto</label>
                    <input type="file" name="input-image" id="input-image" onChange={handleImageChange}/>
                    <i className="fa-solid fa-image"></i>
                </div>
            </figure>
        </div>
    )
}

export default ImageProfile;