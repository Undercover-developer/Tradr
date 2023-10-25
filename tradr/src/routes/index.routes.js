const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const userAuthRoutes = require('./userAuth.routes');
const userConfigRoutes = require('./userConfig.routes');
const userProfileRoutes = require('./userProfile.routes');

router.use('/auth', userAuthRoutes);
router.use('/config', authMiddleware, userConfigRoutes);
router.use('/user_profile', authMiddleware, userProfileRoutes);

module.exports = router;