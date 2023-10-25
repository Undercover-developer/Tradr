const Binance = require('node-binance-api');

module.exports = function(apiKey, apiSecret) {
  const binance = new Binance().options({
    APIKEY: apiKey,
    APISECRET: apiSecret,
    useServerTime: true,
    test: true
  });
  return binance;
};
