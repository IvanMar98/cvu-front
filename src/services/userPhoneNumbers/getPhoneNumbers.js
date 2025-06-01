import axios from "axios";
import { use } from "react";

export const getPhoneNumbers = async () => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    return await axios
        .get(`http://localhost:8001/phone-numbers/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const {data} = response;
            return data;
        })
}
