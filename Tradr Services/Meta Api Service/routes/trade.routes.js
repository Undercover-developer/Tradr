const router = require('express').Router()
const tradeController = require('../controller/custom-trade.controller')

router.post('/buy', tradeController.FuturesBuy)
router.post('/sell', tradeController.FuturesSell)
router.get('/open_orders/:userId', tradeController.FetchOpenOrders)
router.get('/open_positions/:userId', tradeController.FetchOpenPositions)
router.get('/trade_history/:userId', tradeController.FetchTradeHistory)
// router.post('/spot/buy', tradeController.SpotBuy)
// router.post('/spot/sell', tradeController.SpotSell)

module.exports = router