import displayToast from "@/utils/displayToast";
export const alert = {
    namespaced: true,
    state: {
        alert: {
            type: null,
            message: null
        }
    },
    mutations: {
        success(state, message) {
            state.alert.type = 'success';
            state.alert.message = message;
        },
        error(state, message) {
            state.alert.type = 'error';
            state.alert.message = message;
        },
        clear(state) {
            state.alert.type = null;
            state.alert.message = null;
        }
    },
    actions: {
        successAlert({ commit }, message) {
            commit('success', message);
            displayToast();
        },
        errorAlert({ commit }, message) {
            commit('error', message);
            displayToast();
        },
        clear({ commit }){
            commit('clear')
        }
    },
    getters: {
        alert: state => state.alert
    }
}