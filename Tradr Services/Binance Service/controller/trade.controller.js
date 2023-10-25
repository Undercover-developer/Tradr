const binanceClient = require('../broker')

module.exports = {
    FuturesBuy: async (req, res) => {
        try {
            //ORDER OPEN
            await binanceClient.futuresOrder('BUY', 'BTCUSDT', 0.1)

            //STOP-LOSS
            await binanceClient.futuresOrder('SELL', 'BTCUSDT', 0.1, false, { type: 'STOP_MARKET', workingType: 'MARK_PRICE', stopPrice: 0.0116, closePosition: true })

            //TAKE_PROFIT_MARKET
            await binanceClient.futuresOrder('SELL', 'BTCUSDT', 0.1, false, { type: 'TAKE_PROFIT_MARKET', workingType: 'MARK_PRICE', stopPrice: 0.01375, closePosition: true })

            //LIMIT
            await binanceClient.futuresOrder('SELL', 'BTCUSDT', 0.1 / 3, false, { type: 'LIMIT', timeInForce: 'GTC', price: 0.012796, reduceOnly: true })
            // await binanceClient.futuresCancelAll("BTCUSDT")
            // let ticker = await binanceClient.futuresPrices()
            // const result = await binanceClient.futuresBuy('BTCUSDT', 0.1, 30222)
            // let takeProfit = ticker.BTCUSDT * 1.2
            // let result1 = await binanceClient.futuresSell('BTCUSDT', 0.1, takeProfit, {
            //     orderId: result.orderId,
            //     stopPrice: takeProfit,
            //     type: "TAKE_PROFIT",
            //     priceProtect: true
            // })
            // console.log(result)
            // console.log(result1)
            // if (result.code) {
            //     return res.json({
            //         success: false,
            //         message: result.msg,
            //         orderInfo: `order failed with ERR_CODE ${result.code}`
            //     })
            // }

            return res.json({
                success: true,
                message: 'order successful',
                orderInfo: "result"
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: 'order failed'
            })
        }
    },
    FuturesSell: async (req, res) => {
        try {
            await binance.futuresCancelAll("BTCUSDT")
            const result = await binanceClient.futuresSell('BTCUSDT', 0.5,)
            console.log(result)
            if (result.code) {
                return res.json({
                    success: false,
                    message: result.msg,
                    orderInfo: `order failed with ERR_CODE ${result.code}`
                })
            }

            return res.json({
                success: true,
                message: 'order successful',
                orderInfo: result
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: 'order failed'
            })
        }
    },
    SpotBuy: async (req, res) => {
        try {
            await binanceClient.cancelAll("BTCUSDT")
            let ticker = await binanceClient.prices()
            const result = await binanceClient.marketBuy('BTCUSDT', 0.1, async (error, response) => {
                let takeProfit = ticker.BTCUSDT * 1.2
                console.log(await binanceClient.sell('BTCUSDT', 0.1, takeProfit, {
                    orderId: response.orderId,
                    stopPrice: takeProfit,
                    type: "TAKE_PROFIT",
                    timeInForce: "GTC",
                    priceProtect: true
                }))
            })
            console.log(result)
            if (result.code) {
                return res.json({
                    success: false,
                    message: result.msg,
                    orderInfo: `order failed with ERR_CODE ${result.code}`
                })
            }
            return res.json({
                success: true,
                message: 'order successful',
                orderInfo: result
            })
        } catch (err) {
            console.log(err)
            return res.json({
                success: false,
                message: 'order failed'
            })
        }
    },
    SpotSell: async (req, res) => {

    }
}