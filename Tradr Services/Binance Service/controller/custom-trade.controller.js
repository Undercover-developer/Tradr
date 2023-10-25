const BinanceBotUser = require('../model/BinanceBotUser');
// const UserConfiguration = require('../model/UserConfiguration');
const brokerFactory = require('../factory/brokerFactory');
const redisClient = require('../config/redisClient');

const FuturesBuy = async (req, res) => {
    try {
        const users = await BinanceBotUser.find().populate('configuration');
        for (let user of users) {
            try{
                if(user.enabled) {
                    const binanceClient = brokerFactory(user.apiKey, user.apiSecret);
                    console.log(await binanceClient.futuresLeverage('BTCUSDT', 10), "leverage");
                    const prices = await binanceClient.futuresPrices()
                    let volume = 0;
                    let profit = 0;
                    let priceMovement = 0;
                    if(user.configuration.tradeBy === 'volume') {
                        volume = user.configuration.size / 100;
                    } else if(user.configuration.tradeBy === 'amount') {
                        // const leverage = await binanceClient.futuresLeverageBracket('BTCUSDT');
                        // const amount = user.configuration.amount * leverage[0].brackets[0].initialLeverage;
                        const leverage = 10;
                        const amount = user.configuration.amount * leverage;
                        volume = (amount/prices.BTCUSDT).toPrecision(1)
                        profit = 0.2 * user.configuration.amount;
                        console.log(profit, amount, volume, user.configuration.amount);
                        priceMovement = (profit / volume).toFixed(2);
                    }
                    await binanceClient.futuresCancelAll("BTCUSDT");
                    console.log(volume, "volume")
                    // const volume = user.configuration.size / 100;
                    const result = await binanceClient.futuresBuy('BTCUSDT', volume);
                    console.log(result, "result")
                    // const resultStatus = await binanceClient.futuresOrderStatus('BTCUSDT', { orderId: result.orderId });
                    // console.log(resultStatus, "resultStatus")
                    // if (result.code) return res.status(500).send(result);
                    // console.log(result);
                    const stopLoss = parseFloat(prices.BTCUSDT) - parseFloat(priceMovement)
                    // console.log(result1);
                    // const takeProfit = (prices.BTCUSDT * ((user.configuration.takeProfit / 100) + 1) < 1.2 ? 1.2 : prices.BTCUSDT * ((user.configuration.takeProfit / 100) + 1)).toFixed(2);
                    const takeProfit = parseFloat(prices.BTCUSDT) + parseFloat(priceMovement)
                    console.log(takeProfit, "takeProfit", typeof takeProfit)
                    console.log(stopLoss, "stopLoss", typeof stopLoss)
                    console.log(prices.BTCUSDT, "prices.BTCUSDT", typeof prices.BTCUSDT)
                    console.log(priceMovement, "priceMovement", typeof priceMovement)
                    
                    const result1 = await binanceClient.futuresSell('BTCUSDT', volume, stopLoss, { orderId: result.orderId, stopPrice: stopLoss, type: "STOP", priceProtect: true })
                    const result2 = await binanceClient.futuresSell('BTCUSDT', volume, takeProfit, { orderId: result.orderId, stopPrice: takeProfit, type: "TAKE_PROFIT", priceProtect: true })
                    console.log(result2);
                    // console.log(result1);
                    let trade = {
                        tradeId: result.orderId,
                        userId: user.userId,
                        platform: 'binance',
                        symbol: 'BTCUSDT',
                        side: 'long',
                        status: 'open',
                        profit: 0,
                        volume: user.configuration.size / 100,
                        price: prices.BTCUSDT
                    }
                    await redisClient.publish('trade-log', JSON.stringify(trade));
                }
            } catch(error) {
                console.log(error);
                continue;
            }
        }
        res.status(200).json({success: true, message: 'order successful'}); 
    } catch(error) {
        console.log(error);
        return res.status(500)
    }
};

const FuturesSell = async (req, res) => {
    try {
        const users = await BinanceBotUser.find().populate('configuration');
        for (let user of users) {
            try{
                if(user.enabled) {
                    const binanceClient = brokerFactory(user.apiKey, user.apiSecret);
                    // const prices = await binanceClient.futuresPrices()
                    // await binanceClient.futuresCancelAll("BTCUSDT");
                    // const volume = user.configuration.size / 100;
                    // const result = await binanceClient.futuresSell('BTCUSDT', volume);
                    // if (result.code) return res.status(500).send(result);
                    // // console.log(result);
                    // const stopLoss = (prices.BTCUSDT * (1 + (user.configuration.stopLoss / 100))).toFixed(2);
                    // const result1 = await binanceClient.futuresBuy('BTCUSDT', volume, stopLoss, { orderId: result.orderId, stopPrice: stopLoss, type: "STOP", priceProtect: true })
                    // // console.log(result1);
                    // const takeProfit = (prices.BTCUSDT * ((1 - (user.configuration.takeProfit / 100)) > 0.8 ? 0.8 : prices.BTCUSDT * (1 - (user.configuration.takeProfit / 100)))).toFixed(2);
                    // const result2 = await binanceClient.futuresBuy('BTCUSDT', volume, takeProfit, { orderId: result.orderId, stopPrice: takeProfit, type: "TAKE_PROFIT", priceProtect: true })
                    // // console.log(result2);console.log(await binanceClient.futuresLeverage('BTCUSDT', 10), "leverage");

                    console.log(await binanceClient.futuresLeverage('BTCUSDT', 10), "leverage");
                    const prices = await binanceClient.futuresPrices()
                    let volume = 0;
                    let profit = 0;
                    let priceMovement = 0;
                    if(user.configuration.tradeBy === 'volume') {
                        volume = user.configuration.size / 100;
                    } else if(user.configuration.tradeBy === 'amount') {
                        const leverage = 10;
                        const amount = user.configuration.amount * leverage;
                        volume = (amount/prices.BTCUSDT).toPrecision(1)
                        profit = 0.2 * user.configuration.amount;
                        console.log(profit, amount, volume, user.configuration.amount);
                        priceMovement = (profit / volume).toFixed(2);
                    }
                    await binanceClient.futuresCancelAll("BTCUSDT");

                    console.log(volume, "volume")
                    const result = await binanceClient.futuresSell('BTCUSDT', volume);
                    console.log(result, "result")

                    const stopLoss = parseFloat(prices.BTCUSDT) + parseFloat(priceMovement)
                    const takeProfit = parseFloat(prices.BTCUSDT) - parseFloat(priceMovement)

                    const result1 = await binanceClient.futuresBuy('BTCUSDT', volume, stopLoss, { orderId: result.orderId, stopPrice: stopLoss, type: "STOP", priceProtect: true })
                    const result2 = await binanceClient.futuresBuy('BTCUSDT', volume, takeProfit, { orderId: result.orderId, stopPrice: takeProfit, type: "TAKE_PROFIT", priceProtect: true })
    
                    let trade = {
                        tradeId: result.orderId,
                        userId: user.userId,
                        platform: 'binance',
                        symbol: 'BTCUSDT',
                        side: 'short',
                        status: 'open',
                        profit: 0,
                        volume: user.configuration.size / 100,
                        price: prices.BTCUSDT
                    }
                    await redisClient.publish('trade-log', JSON.stringify(trade));
                }
            } catch(error) {
                console.log(error);
                continue;
            }
        }
        res.status(200).json({success: true, message: 'order successful'});
    } catch(error) {
        console.log(error);
        return res.status(500)
    }
};

const FetchOpenOrders = async (req, res) => {
    try {
        const user = await BinanceBotUser.findOne({userId: req.params.userId}).populate('configuration');
        const binanceClient = brokerFactory(user.apiKey, user.apiSecret);
        const openOrders = await binanceClient.futuresOpenOrders('BTCUSDT');
        if (openOrders.code) return res.status(500).send(openOrders);
        console.log(openOrders);
        return res.status(200).json(openOrders);
    } catch(error) {
        console.log(error);
        return res.status(500)
    }
};

const FetchOpenPositions = async (req, res) => {
    try {
        const user = await BinanceBotUser.findOne({userId: req.params.userId}).populate('configuration');
        const binanceClient = brokerFactory(user.apiKey, user.apiSecret);
        const openPositions = await binanceClient.futuresPositionRisk();
        if (openPositions.code) return res.status(500).send(openPositions);
        console.log(openPositions);
        return res.status(200).json(openPositions);
    } catch(error) {
        console.log(error);
        return res.status(500)
    }
};

const FetchTradeHistory = async (req, res) => {
    try {
        const user = await BinanceBotUser.findOne({userId: req.params.userId}).populate('configuration');
        if(!user) return res.status(404).json({success: false, message: 'user not found'});
        const binanceClient = brokerFactory(user.apiKey, user.apiSecret);
        const tradeHistory = await binanceClient.futuresAllOrders('BTCUSDT');
        if (tradeHistory.code) return res.status(500).send(tradeHistory);
        console.log(tradeHistory);
        return res.status(200).json(tradeHistory);
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'error occurred while fetching trades'})
    }
}


module.exports = {
    FuturesBuy,
    FuturesSell,
    FetchOpenOrders,
    FetchOpenPositions,
    FetchTradeHistory
};