import axios from "axios";

export const postLogin = async ({ email, password }) => {
    return await axios
        .post('http://localhost:8001/login', {email, password})
        .then((response) => {
            const {data} = response;
            return data;
        })
}