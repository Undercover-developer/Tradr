import httpClient from "../httpClient";

const endPoint = "/config";

const updatePlatformConfig = (payload) => {
    return httpClient.put(`${endPoint}/platform`, payload);
}
const updateTradeConfig = (payload) => {
    return httpClient.put(`${endPoint}/trade`, payload);
}


export {
    updatePlatformConfig,
    updateTradeConfig
}