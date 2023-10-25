import { signUp, login, getQrCode, signUpOtp, loginOtp, getResetUserId, resetOtp, resetPassword } from "@/api/main/auth";
import router from "@/router";
const authUserId = localStorage.getItem("authUserId");

export const account = {
    namespaced: true,
    state: {
        authUserId: authUserId ? authUserId : null,
        authQrCode: null,
    },
    actions: {
        register({ dispatch, commit }, payload) {
            return signUp(payload).then(
                response => {
                    if(response.status === 201){
                        dispatch('setAuthUserId', response.data.data.userId);
                        dispatch('alert/successAlert', "sign up successful", { root: true });
                        router.push("/auth/qr");
                    } else if(response.status < 500){
                        dispatch('alert/errorAlert', response.data.message, { root: true });
                    }  
                }).catch(() => {
                    commit('setAuthUserId', null);
                    dispatch('alert/errorAlert', "error occurred during sign up", { root: true })
                });
        },
        login({ dispatch }, payload) {
            return login(payload).then(
                response => { 
                    if(response.status === 200){
                        dispatch('setAuthUserId', response.data.data.userId);
                        dispatch('alert/successAlert', "login successful", { root: true });
                        router.push("/auth/otp?authType=login");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    }
                }).catch(() => {
                    dispatch('setAuthUserId', null);
                    dispatch('alert/errorAlert', "error occurred during login", { root: true })
                });
        },
        setAuthUserId({ commit, }, payload) {
            commit('setAuthUserId', payload);
            localStorage.setItem("authUserId", payload);
        },
        getAuthQrCode({ dispatch, commit, state }) {
            return getQrCode(state.authUserId).then(
                response => {
                    commit('setAuthQrCode', response.data.data.qrCode);
                }).catch(() => {
                    commit('setAuthQrCode', null);
                    dispatch('alert/errorAlert', "error occurred during qr code generation", { root: true })
                });
        },
        handleSignUpOtp({ dispatch, commit }, payload) {
            return signUpOtp(payload).then(
                response => {
                    if(response.status === 200){
                        commit('setAuthUserId', null);
                        localStorage.removeItem("authUserId");
                        dispatch('alert/successAlert', "sign up otp verification successful", { root: true });
                        router.push("/auth/login");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    } 
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during sign up otp verification", { root: true })
                });
        },
        handleLoginOtp({ dispatch, commit }, payload) {
            return loginOtp(payload).then(
                response => {
                    if(response.status === 200){
                        commit('setAuthUserId', null);
                        localStorage.removeItem("authUserId");
                        localStorage.setItem("user", JSON.stringify(response.data.data.user));
                        localStorage.setItem("accessToken", response.data.data.token);
                        dispatch('user/setUserProfile', response.data.data.user, { root: true });
                        dispatch('alert/successAlert', "login otp verification successful", { root: true });
                        router.push("/dashboard");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    }
                }).catch((error) => {
                    console.log(error);
                    dispatch('alert/errorAlert', "error occurred during login otp verification", { root: true })
                });
        },
        logout({ dispatch }) {
            dispatch('user/setUserProfile', null, { root: true });
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            router.push("/auth/login");
        },
        getResetUserId({ dispatch, commit }, payload) {
            return getResetUserId(payload).then(
                response => {
                    if(response.status === 200){
                        commit('setAuthUserId', response.data.data.userId);
                        localStorage.setItem("authUserId", response.data.data.userId)
                        // dispatch('alert/successAlert', "reset user id successful", { root: true });
                        router.push("/auth/otp?authType=reset");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    }
                }).catch(() => {
                    commit('setAuthUserId', null);
                    dispatch('alert/errorAlert', "error occurred during password reset", { root: true })
                });
        },
        handleResetOtp({ dispatch }, payload) {
            return resetOtp(payload).then(
                response => {
                    if(response.status === 200){
                        // commit('setAuthUserId', null);
                        // localStorage.removeItem("authUserId");
                        dispatch('alert/successAlert', "password reset otp verification successful", { root: true });
                        router.push("/auth/reset-password");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    }
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during password reset otp verification", { root: true })
                });
        },
        resetPassword({ dispatch, commit }, payload) {
            return resetPassword(payload).then(
                response => {
                    if(response.status === 200){
                        commit('setAuthUserId', null);
                        localStorage.removeItem("authUserId");
                        dispatch('alert/successAlert', "password reset successful", { root: true });
                        router.push("/auth/login");
                    } else if(response.status < 500) {
                        dispatch('alert/errorAlert', response.data.message, { root: true })
                    }
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during password reset", { root: true })
                });
        }
    },
    mutations: {
        setAuthUserId(state, userId) {
            state.authUserId = userId;
        },
        setAuthQrCode(state, qrCode) {
            state.authQrCode = qrCode;
        },
    },
    getters: {
        authQrCode: state => state.authQrCode,
        authUserId: state => state.authUserId,
    }
}