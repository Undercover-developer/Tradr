import axios from "axios";

const httpClient = axios.create({
    baseURL: `http://localhost:7070/api/`,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => {
        return status >= 200 && status < 500;
    },
})
// const getAuthToken = () => localStorage.getItem("accessToken")
// const authInterceptor = (config) => {
//     config.headers['Authorization'] = `Bearer ${getAuthToken()}`
//     return config
// }
// httpClient.interceptors.request.use(authInterceptor)

export default httpClient