import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from '../services/login/login';
import { use } from "react";

const loginHook = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ errorLogin, setErrorLogin ] = useState(false);
    const [ errorTitle, setErrorTitle ] = useState('');
    const [ errorTextBody, setErrorTextBody ] = useState('');

    const customSubmit = async (data) => {
        const { email, password } = data;
        setLoading(true);
        try {
            const response = await postLogin({email, password});
            if(response?.status?.code === 200) {
                setTimeout(() => {
                    setLoading(false);
                    const { user_id, token } = response.data;
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('userId', user_id)
                    navigate('/inicio');
                },2000)  
            }
        } catch (error) {
            console.log(error)
            if(error?.response?.status === 401) {
                setTimeout(() => {
                    setLoading(false);
                    setErrorLogin(true);
                    setErrorTitle('Error!')
                    setErrorTextBody('Error al iniciar sesion, por favor verifica tu informacion');
                },2000);
            }else {{
                setTimeout(() => {
                    setLoading(false);
                    setErrorLogin(true);
                    setErrorTitle('Error!')
                    setErrorTextBody('Hubo un problema inesperado, intentalo de nuevo mas tarde');
                },2000);
            }}
        }
    }

    return {
        customSubmit,
        loading,
        errorLogin,
        errorTitle,
        errorTextBody,
        setErrorLogin
    }
}

export default loginHook;