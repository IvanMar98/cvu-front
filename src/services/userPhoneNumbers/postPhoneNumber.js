import axios from "axios";

export const postPhoneNumber = async ({phone_number, phone_type, is_primary}) => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    const payload = {
        user_id: userId,
        phone_number,
        phone_type,
        is_primary
    }
    return await axios
        .post(`http://localhost:8001/phone-numbers/`, 
            payload, 
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
