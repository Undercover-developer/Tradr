import httpClient from "../httpClient";

const endPoint = "/user_profile";

const getUserProfile = () => {
    return httpClient.get(`${endPoint}`);
}

const updateUserProfile = (payload) => {
    return httpClient.put(`${endPoint}`, payload);
}

const updateUserPassword = (payload) => {
    return httpClient.put(`${endPoint}/password`, payload);
}

export {
    getUserProfile,
    updateUserProfile,
    updateUserPassword
}