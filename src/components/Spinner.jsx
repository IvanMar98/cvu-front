import { ClipLoader } from 'react-spinners';

const Spinner = ({loading, text}) => {
    if (!loading) return null;

    return(
       <div className={`spinner-overlay ${loading ? 'show' : ''}`}>
            {loading && (
                <>
                    <ClipLoader color="#000FFF" loading={loading} size={80} />
                    <p className="spinner-text">{text}</p>
                </>
            )}
        </div>
    )
}

export default Spinner;