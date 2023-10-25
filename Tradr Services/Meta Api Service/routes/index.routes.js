const router = require('express').Router()
const botUserRoutes = require('./bot-users.routes')
const tradeRoutes = require('./trade.routes')

router.use('/bot-user', botUserRoutes)
router.use('/futures', tradeRoutes)

module.exports = router