import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { newRegistry } from "../services/records/postRecord"

const registryHook = ({ acceptTermsAndConditions }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ errorRegistry, setErrorRegistry ] = useState(false);
    const [ errorTitle, setErrorTitle ] = useState('');
    const [ errorTextBody, setErrorTextBody ] = useState('');

    const customSubmit = async (data) => {
        
        const { names, firstLastName, secondLastName, curp, rfc, email, password } = data;
        
        if (!acceptTermsAndConditions) {
            setErrorRegistry(true);
            setErrorTitle('Warning!');
            setErrorTextBody('Es necesario que aceptes que la informacion proporcionada es real y correcta');
            return
        }
        try {
            setLoading(true);
            // hacer un post en la api con axios
            const response = await newRegistry({ names, firstLastName, secondLastName, curp, rfc, email, password })
            if(response.status === 'success') {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/'); 
                },2000)
            }
        } catch (error) {
            const { status, data } = error?.response;

            setLoading(false); // Desactiva el spinner si ocurre un error inesperado.
            if(status === 409) {
                const { errors } = data
                const findFiled = errors.find((field) => field.field === 'curp' || field.field === 'rfc' || field.field === 'email').field;
                if(findFiled !== 'email') {
                    setErrorRegistry(true);
                    setErrorTitle('Error!');
                    setErrorTextBody('Por favor, revisa la información e inténtalo nuevamente.');
                }else {
                    setErrorRegistry(true);
                    setErrorTitle('Error!');
                    setErrorTextBody('Parece que ya existe una cuenta registrada. Si es tuya, intenta iniciar sesión.');
                }
            }
            else {
                setErrorRegistry(true);
                setErrorTitle('Error inesperado!');
                setErrorTextBody('Ocurrió un error al procesar tu solicitud. Intenta de nuevo más tarde.');
            }
        }
    }

    const handleCloseModalError = () => {
        setErrorRegistry(false);
    }

    return {
        customSubmit,
        loading,
        errorRegistry,
        errorTitle,
        errorTextBody,
        handleCloseModalError
    }
}

export default registryHook;