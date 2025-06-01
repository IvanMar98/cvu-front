import axios from "axios";

export const deletePhoneNumber = async (phoneNumber) => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    return await axios
        .delete(`http://localhost:8001/phone-numbers/${userId}/${phoneNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            const {data} = response;
            return data;
        })
}
