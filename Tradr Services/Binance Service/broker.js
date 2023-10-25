const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '46697762e7558c6a53c5131b18ccef94f5850b818c046fb97b31532e7a4046ea',
  APISECRET: 'c8faaca9a75e5efaa4774a8bda81d52daad2692a81ed4b9e122e3acaedeb9b5d',
  useServerTime: true,
  test:true
});

module.exports = binance