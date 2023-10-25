import httpClient from "../httpClient";

const endPoint = "/futures";

const getOpenOrders = (userId) => {
    return httpClient.get(`${endPoint}/open_orders/${userId}`);
}

const getTradeHistory = (userId) => {
    return httpClient.get(`${endPoint}/trade_history/${userId}`);
}

const getTradeHistoryBySymbol = (userId, symbol) => {
    return httpClient.get(`${endPoint}/trade_history/${userId}/${symbol}`);
}

export {
    getOpenOrders,
    getTradeHistory,
    getTradeHistoryBySymbol
}