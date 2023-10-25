const { v4: uuidv4 } = require('uuid');
const KucoinBotUser = require('../model/KucoinBotUser')
const brokerFactory = require('../factory/brokerFactory')

const Buy = async (req, res) => {
    const users = await KucoinBotUser.find()
    for (let user of users) {
        const broker = brokerFactory(user.apiKey, user.secretKey, user.passphrase)
        const params = {
            clientOid: uuidv4(),
            side: 'buy',
            symbol: 'BTC-USDT',
            type: 'limit',
            remark: 'test',
            price: '10000',
            size: '0.001',
            timeInForce: 'GTC',
        }
        const response = await broker.placeOrder(params)
        console.log(response)
    }
}

const Sell = async (req, res) => {
    const users = await KucoinBotUser.find()
    for (let user of users) {
        const broker = brokerFactory(user.apiKey, user.secretKey, user.passphrase)
        const params = {
            clientOid: uuidv4(),
            side: 'sell',
            symbol: 'BTC-USDT',
            type: 'limit',
            remark: 'test',
            price: '10000',
            size: '0.001',
            timeInForce: 'GTC',
        }
        const response = await broker.placeOrder(params)
        console.log(response)
    }
}

module.exports = {
    Buy,
    Sell
}