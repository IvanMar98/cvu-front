import '../assets/styles/ModalError.css'

const ModalError = ({ title, textBody, handleCloseModalError, id, isRetry, handleRetry, icon, type, mainButtonText, secondaryButtonText }) => {
    return (
        <div className='modal-error-container' onClick={handleCloseModalError}>
            <div className='modal-error d-flex flex-column align-items-center'>
                <div className={`modal-top-bar bg-${type}`}></div>
                <div className={`modal-error-icon modal-${type}-type h-100 w-100 d-flex flex-column justify-content-center align-items-center`}>
                    <i className={icon}></i>
                </div>
                <div className='modal-error-title h-100 w-100 d-flex flex-column justify-content-center align-items-center'>
                    <h3>{title}</h3>
                </div>
                <div className='modal-error-text h-100 w-100 d-flex flex-column justify-content-center align-items-center text-secondary'>
                    <p className='text-center p-3'>{textBody}</p>
                </div>
                <div className='modal-error-button w-100 text-center d-flex justify-content-evenly align-items-center'>
                    <button id={`${id}-primary-button`} className={`btn btn-${type} text-light`} onClick={handleCloseModalError}>{mainButtonText}</button>
                    {isRetry && (
                        <button id={`${id}-secondary-button`} className='btn btn-secondary' onClick={handleRetry}>{secondaryButtonText}</button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ModalError;