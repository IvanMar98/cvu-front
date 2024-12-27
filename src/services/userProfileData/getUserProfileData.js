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

export const updateProfileData = async (newData) => {
    const { names, firstLastName, secondLastName, birthdate, countryOfBirth, curp, rfc, gender, imageProfile } = newData;
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    return await axios
        .put(`http://localhost:8001/update-info/${userId}`, 
            {
                names,
                first_last_name: firstLastName,
                second_last_name: secondLastName,
                birthdate,
                countryOfBirth,
                gender,
                curp,
                rfc,
                image_profile: imageProfile
            },
            {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then((response) => {
            const {data} = response;
            return data;
        })
}