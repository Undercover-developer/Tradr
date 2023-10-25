const Kucoin = require('kucoin-node-api');

module.exports = function (apiKey, secretKey, passphrase) {
    return Kucoin.init({
        apiKey,
        secretKey,
        passphrase,
        environment: 'test'
    });
}