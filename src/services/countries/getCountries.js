import axios from "axios";

export const getCountries = async () => {
    
    return await axios
        .get('http://localhost:8001/paises/')
        .then((response) => {
            console.log(response)
            const {data} = response;
            return data;
        })
}