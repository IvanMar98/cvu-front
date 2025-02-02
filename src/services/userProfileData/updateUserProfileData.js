import axios from "axios";

export const updateProfileData = async (newData) => {
    const { names, firstLastName, secondLastName, birthdate, countryOfBirth, curp, rfc, gender, imageProfile, biography } = newData;
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
                image_profile: imageProfile,
                biography
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