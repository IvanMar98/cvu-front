import '../assets/styles/ModalError.css'

const ModalError = ({title, textBody, handleCloseModalError}) => {
    return(
        <div className = 'modal-error-container' onClick={handleCloseModalError}>
            <div className='modal-error d-flex flex-column align-items-center'>
                <div className='modal-error-title h-100 w-100 d-flex flex-column justify-content-center align-items-center'>
                    <h3>{title}</h3>
                </div>
                <div className='modal-error-text h-100 w-100 d-flex flex-column justify-content-center align-items-center text-secondary'>
                    <p>{textBody}</p>
                </div>
                <div className='modal-error-button w-100 text-center d-flex flex-column justify-content-center align-items-center'>
                    <button className='btn btn-danger' onClick={handleCloseModalError}>Entendido</button>
                </div>
            </div>
           
        </div>
    )
}

export default ModalError;