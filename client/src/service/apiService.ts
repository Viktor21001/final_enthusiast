import axios from "axios";

export const apiService = axios.create({
     withCredentials: true 
})

export default apiService