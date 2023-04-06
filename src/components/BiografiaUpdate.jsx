import { Link } from 'react-router-dom';
import '../assets/styles/BiografiaUpdate.css'
function BiografiaUpdate(){
    return(
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pt-4 pb-4">
            <div className="container-fluid text-center">
                <h2>Modificar Biografia</h2>
            </div>
            <div className="container-fluid pt-2">
                <div className="container-fluid menu__action bg-secondary">
                    <button className='fw-bold'>B</button>
                    <button className='fst-italic'>I</button>
                    <button className='text-decoration-underline'>U</button>
                </div>
                <textarea name="biografia" className="w-100" rows="8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus omnis beatae quibusdam explicabo non commodi sit fuga laudantium excepturi culpa libero at repudiandae corrupti quia, repellendus laborum? Eum, adipisci recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui esse itaque odit aliquam veritatis magnam. Possimus odit placeat quibusdam odio sint qui fuga amet maxime suscipit. A corporis ipsa atque.</textarea>
            </div>
            <div className='container-fluid pt-3 text-center'>
                <Link to ={'/perfil-cuenta'} className='btn btn-success me-4'>Guardar Cambios</Link>
                <Link to = {'/perfil-cuenta'} className='btn btn-danger'>Cancelar</Link>
            </div>
        </div>
    );
};

export default BiografiaUpdate;