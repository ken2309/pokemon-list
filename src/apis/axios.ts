import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_API_URL;
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
});
axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;