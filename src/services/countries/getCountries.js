import axios from "axios";

export const getCountries = async () => {
    const token = localStorage.getItem('userToken');
    
    return await axios
        .get('http://localhost:8001/paises/', {
                headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const {data} = response;
            return data;
        })
}