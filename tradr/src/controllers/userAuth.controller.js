const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');
const AuthService = require('../services/authService');
const userService = require('../services/userService');

class userAuth {
    static async registerUser(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide email, password, firstName and lastName'
                });
            }
            const user = await userService.getUserByEmail(email);
            if (user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists'
                });
            }
            const tempSecret = speakeasy.generateSecret({name: 'TradeBot'});
            const newUser = await userService.createNewUser({
                email,
                password,
                firstName,
                lastName,
                tempSecret
            });
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: {
                    userId: newUser.userId
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async getTempQrCode(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide userId'
                });
            }
            const user = await User.findOne({ userId });
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const qrCode = await qrcode.toDataURL(user.tempSecret.otpauth_url);
            return res.status(200).json({
                status: 'success',
                message: 'QR code generated successfully',
                data: {
                    qrCode
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async verifyOtpAndRegister(req, res) {
        try {
            const { userId, otp } = req.body;
            if (!userId || !otp) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide userId and otp'
                });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User does not exist'
                });
            }
            const verified = speakeasy.totp.verify({
                secret: user.tempSecret.ascii,
                encoding: 'ascii',
                token: otp
            });
            if (!verified) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid OTP'
                });
            }
            // const secret = speakeasy.generateSecret();
            const updatedUser = await userService.updateUser(userId, {  secret: user.tempSecret, tempSecret: null });
            return res.status(200).json({
                status: 'success',
                message: 'User verified successfully',
                data: {
                    userId: updatedUser.userId
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }


    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide email and password'
                });
            }
            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await AuthService.compare(password, user.password))) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Incorrect email or password'
                });
            }
            
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: {
                    userId: user.userId,
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async verifyOtpAndLogin(req, res) {
        try {
            const { userId, otp } = req.body;
            if (!userId || !otp) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide userId and otp'
                });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const verified = speakeasy.totp.verify({
                secret: user.secret.ascii,
                encoding: 'ascii',
                token: otp
            });
            if (!verified) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid OTP'
                });
            }
            const token = await AuthService.generateToken({ userId: user.userId });

            const serializedUser = await userService.serializeUser(user);
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: {
                    user: serializedUser,
                    token
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide email'
                });
            }
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'User found',
                data: {
                    userId: user.userId
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async verifyForgotPasswordOtp(req, res) {
        try {
            const { userId, otp } = req.body;
            if (!userId || !otp) {
                return res.status(400).json({
                    status: 'error',
                    message: 'could not verify otp'
                });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid otp'
                });
            }
            const verified = speakeasy.totp.verify({
                secret: user.secret.ascii,
                encoding: 'ascii',
                token: otp
            });
            if (!verified) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid otp'
                });
            }
            await userService.updateUser(userId, { tempSecret: user.secret });
            return res.status(200).json({
                status: 'success',
                message: 'otp verified successfully',
                data: {
                    userId: user.userId
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { userId, password } = req.body;
            if (!userId || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Error occurred while resetting password'
                });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const hashedPassword = await AuthService.encryptPassword(password);
            await userService.updateUser(userId, { password: hashedPassword, tempSecret: null });
            return res.status(200).json({
                status: 'success',
                message: 'Password reset successfully',
                data: {
                    userId: user.userId
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async verifyAuthToken(req, res) {
        try {
            res.status(200).json({
                status: 'success',
                message: 'token validated successfully',
                tokenStatus: 'valid'
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = userAuth;