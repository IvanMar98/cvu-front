import axios from "axios";

export const newRegistry = async ({ names, firstLastName, secondLastName, curp, rfc, email, password }) => {
    const registry = {
        names,
        first_last_name: firstLastName,
        second_last_name: secondLastName,
        curp,
        rfc,
        email,
        password
    }
    return await axios
        .post('http://localhost:8001/new-registry', registry)
        .then((response) => {
            const {data} = response;
            return data;
        })
}