import axios from "axios";

export const verifyAuth = async () => {
    const token = localStorage.getItem('userToken');

    return await axios
        .get('http://localhost:8001/verify-auth',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const {data} = response;
            return data;
        })
}