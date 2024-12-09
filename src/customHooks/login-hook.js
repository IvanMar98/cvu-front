import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from '../services/login/login';

const loginHook = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const customSubmit = async (data) => {
        console.log(data)
        const { email, password } = data;
        setLoading(true);
        try {
        const response = await postLogin({email, password});
        if(response.status.code === 200) {
            setTimeout(() => {
                setLoading(false);
                localStorage.setItem('userToken', response.data.token);
                navigate('/inicio');
            },2000)
        }else {
            setTimeout(() => {
                setLoading(false);
                alert('Error al iniciar la sesion, verifica tu informacion');
            },2000)
        }
        } catch (error) {
            setLoading(false);
            console.error('Error en el Login:', error);
            alert('Hubo un problema inesperado. Inténtalo más tarde.');
        }
    }

    return {
        customSubmit,
        loading
    }
}

export default loginHook;