import '../assets/styles/BiografiaUpdate.css'
import { useUserContext, } from '../context/UserContext';
import useBiographyHook from '../customHooks/useBiographyHook';
import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import ModalError from './ModalError';
import Spinner from './Spinner';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function BiografiaUpdate(){
    const { editUserBiography, handleCloseModalError, handleCancelEditInfo, retryUpdateBiografy } = useBiographyHook();
    const { userData, loading, modalState } = useUserContext();
    const { register, handleSubmit, formState: { errors, isDirty }, reset, watch, setValue } = useForm({
        defaultValues: {
            biography: ''
        }
    });
    
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill('#biography-editor', {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['clean']
                    ]
                }
            });

            quillRef.current.on('text-change', () => {
                const delta = quillRef.current.getContents();
                const content = quillRef.current.root.innerHTML.trim();
                if(delta.ops.length === 1 && delta.ops[0].insert.trim().length === 0) {
                    reset({'biography': ''});
                }else {
                    setValue('biography', content, { shouldDirty: true });
                }
            });
        }
        if(userData) {

        reset({
            biography: userData.biography || ''
        }); 
        quillRef.current.root.innerHTML = userData.biography || '';
        }

    }, [userData, reset, setValue]);

    return(
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pt-4 pb-4">
            <div className="container-fluid text-center">
                <h2>Modificar Biografia</h2>
            </div>
            <form onSubmit={handleSubmit(editUserBiography)} className='form-bibliography w-100'>
                <div className="container-fluid">
                    <div id="biography-editor"></div>
                    <input type="hidden" {...register('biography', { required: true })} />
                    {errors.biography && <span className="text-danger">La biografía es obligatoria.</span>}
                </div>
                <div className='container-fluid pt-3 text-center'>
                    <button type='submit' disabled={!isDirty} className='btn btn-success me-4'>Guardar Cambios</button>
                    <button type='button' className='btn btn-danger' onClick={() => handleCancelEditInfo(isDirty)}>Cancelar</button>
                </div>
            </form>
            {loading && (
                <Spinner
                loading = {loading}
                text={''}
                ></Spinner>
            )}
            {
                modalState.openModal && (
                <ModalError
                title={modalState.title}
                textBody={modalState.textBody}
                id={modalState.modalId}
                isRetry={modalState.canUserRetry}
                type={modalState.type}
                icon={modalState.icon}
                mainButtonText={modalState.mainButtonText}
                secondaryButtonText={modalState.secondaryButtonText}
                handleCloseModalError={handleCloseModalError}
                handleRetry={retryUpdateBiografy}
                ></ModalError>)
            }
            
        </div>
    );
};

export default BiografiaUpdate;