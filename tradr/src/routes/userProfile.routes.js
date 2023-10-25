const router = require('express').Router();
const userProfileController = require('../controllers/userProfile.controller');

router.get('/', userProfileController.getUserProfile);
router.put('/', userProfileController.updateUserProfile);
router.put('/password', userProfileController.changeUserPassword);

module.exports = router;