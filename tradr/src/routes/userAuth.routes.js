const router = require('express').Router();
const userAuthController = require('../controllers/userAuth.controller');
const auth = require('../middlewares/auth');

router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);
router.get('/qr/:userId', userAuthController.getTempQrCode);
router.post('/verify_register_otp', userAuthController.verifyOtpAndRegister);
router.post('/verify_login_otp', userAuthController.verifyOtpAndLogin);
router.post('/reset_user_id', userAuthController.getUserByEmail);
router.post('/verify_reset_otp', userAuthController.verifyForgotPasswordOtp);
router.post('/reset_password', userAuthController.resetPassword);
router.get('/token_status', auth, userAuthController.verifyAuthToken);

module.exports = router;