import { updatePlatformConfig, updateTradeConfig } from "@/api/main/user_config";
import { getUserProfile, updateUserPassword } from "@/api/main/user_profile";
const userprofile = localStorage.getItem("user");
export const user = {
    namespaced: true,
    state: {
        user: userprofile ? JSON.parse(userprofile) : null,
        platformConfig: null,
        tradeConfig: null,
    },
    actions: {
        updateUserPlatformConfig({ dispatch, }, payload) {
            return updatePlatformConfig(payload).then(
                response => {
                    if(response.status === 200){
                        dispatch('getUserProfile');
                        dispatch('alert/successAlert', "user platform config updated", { root: true });
                    } else if(response.status < 500){
                        dispatch('alert/errorAlert', response.data.message, { root: true });
                    }  
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during user platform config update", { root: true })
                });
        },
        updateUserTradeConfig({ dispatch, }, payload) {
            return updateTradeConfig(payload).then(
                response => {
                    if(response.status === 200){
                        dispatch('getUserProfile');
                        dispatch('alert/successAlert', "user trade config updated", { root: true });
                    } else if(response.status < 500){
                        dispatch('alert/errorAlert', response.data.message, { root: true });
                    }
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during user trade config update", { root: true })
                });
        },
        getUserProfile({ dispatch }) {
            return getUserProfile().then(
                response => {
                    if(response.status === 200){
                        dispatch('setUserProfile', response.data.data)
                    } else if(response.status < 500){
                        // dispatch('alert/errorAlert', response.data.message, { root: true });
                    }  
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during user profile fetch", { root: true })
                });
        },
        setUserProfile({ commit }, payload) {
            if(payload){
                commit('setUser', {
                    userId: payload.userId,
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                });
                if(payload.platforms) commit('setPlatformConfig', payload.platforms);
                if(payload.configuration) commit('setTradeConfig', payload.configuration);
            } else {
                commit('setUser', null);
                commit('setPlatformConfig', null);
                commit('setTradeConfig', null);
            }        
        },
        updateUserPassword({ dispatch, }, payload) {
            return updateUserPassword(payload).then(
                response => {
                    if(response.status === 200){
                        dispatch('alert/successAlert', "user password updated", { root: true });
                    } else if(response.status < 500){
                        dispatch('alert/errorAlert', response.data.message, { root: true });
                    }  
                }).catch(() => {
                    dispatch('alert/errorAlert', "error occurred during user password update", { root: true })
                });
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setPlatformConfig(state, platformConfig) {
            state.platformConfig = platformConfig;
        },
        setTradeConfig(state, tradeConfig) {
            state.tradeConfig = tradeConfig;
        },
    },

    getters: {
        user: state => state.user,
        platformConfig: state => state.platformConfig,
        tradeConfig: state => state.tradeConfig,
    }
}
