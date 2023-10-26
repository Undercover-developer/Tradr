const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '',
  APISECRET: '',
  useServerTime: true,
  test:true
});

module.exports = binance