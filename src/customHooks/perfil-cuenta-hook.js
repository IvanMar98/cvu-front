import { useNavigate } from "react-router-dom";
import { getUserProfileData, updateProfileData } from "../services/userProfileData/getUserProfileData";
import { getCountries } from "../services/countries/getCountries";
import { useEffect, useState } from "react";

const perfilCuentaHook = () => {
    const navigate = useNavigate();
    const [ errorTokenExpired, setErrortokenExpired ] = useState(false);
    const [ countries, setCountries ] = useState([]);

    const getUserData = async () => {
        try {
            const response = await getUserProfileData();
            if(response.status === 'success' && response.data) {
                const userData = response.data;
                const { birthdate } = userData;
                const birthdateFormatted = birthdate
                    ? new Date(birthdate).toISOString().split("T")[0]
                    : "";
                userData.birthdate = birthdateFormatted;
                navigate('/perfil-cuenta', {state: {userData}})
            }
        } catch (error) {
            console.error('Error al mostrar la informacion:', error);
            //Mostrar error de token expirado y redirigir al login
            setErrortokenExpired(true);
            
        }
    }

    const editUserData = async () => {
        try {
            const response = await getUserProfileData();
            console.log(response)
            if(response.status === 'success' && response.data) {
                let userData = response.data;
                const countriesResponse = await getAllCountries();
                Object.assign(userData, {countries: countriesResponse.data});
                navigate('/perfil-cuenta/editar-info', {state: {userData}})
                
            }
        } catch (error) {
            console.error('Error al mostrar la informacion:', error);
            setErrortokenExpired(true);
        }
    }

    const getAllCountries = async () => {
        try {
            const response = await getCountries();
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserInfo = async(newData) => {
        try {
            const response = await updateProfileData(newData);
            if(response.status === 'success') {
                const userData = response.data;
                const { birthdate } = userData;
                const birthdateFormatted = birthdate
                    ? new Date(birthdate).toISOString().split("T")[0]
                    : "";
                userData.birthdate = birthdateFormatted;
                navigate('/perfil-cuenta', {state: {userData}})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModalError = () => {
        setErrortokenExpired(false);
        navigate('/')
    }

    return {
        getUserData,
        editUserData,
        errorTokenExpired,
        setErrortokenExpired,
        handleCloseModalError,
        updateUserInfo
    }
}

export default perfilCuentaHook;