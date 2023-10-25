const router = require('express').Router();
const UserConfigController = require('../controllers/userConfig.controller');

router.put('/platform', UserConfigController.updatePlatformConfig);
router.put('/trade', UserConfigController.tradeConfig);

module.exports = router;