import {getTradeHistory} from "@/api/binance/trade"

export const trade = {
    namespaced: true,
    state: {
        binanceTrades: [],
        binanceOpenOrders: [],
        isFetchingTrades: false
    },
    actions: {
        getBinanceTradeHistory({ dispatch, commit, rootState }) {
            commit('setFetchingTrades', true)
            return getTradeHistory(rootState.user.user.userId).then(
                response => {
                    if(response.status === 200){
                        commit('setBinanceTradeHistory', response.data)
                        commit('setFetchingTrades', false)
                    } else if(response.status < 500){
                        commit('setFetchingTrades', false)
                        dispatch('alert/errorAlert', response.data.message, { root: true });
                    }  
                }).catch(() => {
                    commit('setFetchingTrades', false)
                    dispatch('alert/errorAlert', "error occurred during binance trade history fetch", { root: true })
                });
        }

    },
    mutations: {
        setBinanceTradeHistory(state, payload) {
            state.binanceTrades = payload;
        },
        setFetchingTrades(state, payload) {
            state.isFetchingTrades = payload;
        }
    },
    getters: {
        binanceTrades: state => state.binanceTrades,
        isFetchingTrades: state => state.isFetchingTrades
    }
}