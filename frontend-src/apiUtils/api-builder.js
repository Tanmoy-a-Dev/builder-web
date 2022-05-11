import axios from "axios";

export const API_URL = 'http://localhost:5000/api/pages'

export const createPage = async (obj) => {
    try {
        const {data} = await axios.post(`${API_URL}/create-page`, obj)
        return data;
    } catch (error) {
        console.log(error)
    }

}