import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { newRegistry } from "../services/records/postRecord"

const registryHook = ({ acceptTermsAndConditions }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const customSubmit = async (data) => {
        console.log(data)
        const { names, firstLastName, secondLastName, curp, rfc, email, password } = data;
        
        if (!acceptTermsAndConditions) {
            alert('Es necesario que aceptes que la informacion proporcionada es real y correcta');
            return
        }
        try {
            setLoading(true);
            // hacer un post en la api con axios
            const response = await newRegistry({ names, firstLastName, secondLastName, curp, rfc, email, password })
            console.log(response)
            if(response.status === 'success') {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/'); 
                },2000)
            }else {
                setTimeout(() => {
                    setLoading(false);
                    alert('Hubo un problema al registrar el usuario. Por favor, inténtalo nuevamente.');    
                })
            }
        } catch (error) {
            setLoading(false); // Desactiva el spinner si ocurre un error inesperado.
            console.error('Error en el registro:', error);
            alert('Hubo un problema inesperado. Inténtalo más tarde.');

        }
    }

    return {
        customSubmit,
        loading
    }
}

export default registryHook;