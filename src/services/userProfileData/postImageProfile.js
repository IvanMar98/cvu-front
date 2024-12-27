import axios from "axios";

export const postImageProfile = async (image) => {
    const token = localStorage.getItem('userToken');
    return await axios
        .post('http://localhost:8001/update-image-profile', 
            image,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
        .then((response) => {
            const {data} = response;
            console.log(data)
            return data;
        });
}