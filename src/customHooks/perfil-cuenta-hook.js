import { useNavigate } from "react-router-dom";
import { getUserProfileData } from "../services/userProfileData/getUserProfileData";

const perfilCuentaHook = () => {
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await getUserProfileData();
            if(response.status === 'success' && response.data) {
                const userData = response.data;
                navigate('/perfil-cuenta', {state: {userData}})
            }
        } catch (error) {
            console.error('Error al mostrar la informacion:', error);
            //Mostrar error de token expirado y redirigir al login
            navigate('/')
        }
    }

    return {
        getUserData
    }
}

export default perfilCuentaHook;