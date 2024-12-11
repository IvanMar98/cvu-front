import axios from "axios";

export const getUserProfileData = async () => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    return await axios
        .get(`http://localhost:8001/info-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const {data} = response;
            return data;
        })
}