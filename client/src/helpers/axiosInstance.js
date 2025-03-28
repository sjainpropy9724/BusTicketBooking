import axios from "axios";

const API_BASE_URL = "https://busticketbooking-93vx.onrender.com";

export const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});