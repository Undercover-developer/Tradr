import httpClient from "../httpClient";
const endPoint = "/auth";

const login = (payload) => {
    return httpClient.post(`${endPoint}/login`, payload);
}

const signUp = (payload) => {
    return httpClient.post(`${endPoint}/register`, payload);
}

const signUpOtp = (payload) => {
    return httpClient.post(`${endPoint}/verify_register_otp`, payload);
}

const loginOtp = (payload) => {
    return httpClient.post(`${endPoint}/verify_login_otp`, payload);
}

const getQrCode = (userId) => {
    return httpClient.get(`${endPoint}/qr/${userId}`);
}

const getResetUserId = (payload) => {
    return httpClient.post(`${endPoint}/reset_user_id`, payload);
}

const resetOtp = (payload) => {
    return httpClient.post(`${endPoint}/verify_reset_otp`, payload);
}

const resetPassword = (payload) => {
    return httpClient.post(`${endPoint}/reset_password`, payload);
}
export {
    login,
    signUp,
    signUpOtp,
    loginOtp,
    getQrCode,
    getResetUserId,
    resetOtp,
    resetPassword
}