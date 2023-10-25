const router = require('express').Router()
const botUserController = require('../controller/bot-users.controllers')

router.post('/', botUserController.createOrUpdateBotUser)

module.exports = router