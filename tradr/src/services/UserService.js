const User = require('../models/User');
const AuthService = require('../services/authService');

class userService {
    static async createNewUser (userInfo) {
        // const password = AuthService.encryptPassword(userInfo.password);
        const newUser = {
            userId: await AuthService.generateUUID(),
            email: userInfo.email,
            password: await AuthService.encryptPassword(userInfo.password),
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            tempSecret: userInfo.tempSecret
        }
        return User.create(newUser)
    }

    static async getUserByEmail (email) {
        return User.findOne({ email }).select('+password +userId');
    }

    static async getUserById (userId) {
        return User.findOne({ userId })
        .populate('platforms.binanceConfig')
        .populate('platforms.kucoinConfig')
        .populate('configuration');
    }

    static async updateUser (userId, userInfo) {
        return User.findOneAndUpdate({ userId }, userInfo, { new: true });
    }

    static async serializeUser (user) {
        const serializedUser = user.toObject();
        delete serializedUser.password;
        delete serializedUser.tempSecret;
        delete serializedUser.secret;
        delete serializedUser.__v;
        delete serializedUser._id;
        if(serializedUser.platforms){
            if (serializedUser.platforms.binanceConfig && Object.keys(serializedUser.platforms.binanceConfig).length > 0) {
                delete serializedUser.platforms.binanceConfig._id;
                delete serializedUser.platforms.binanceConfig.__v;
                delete serializedUser.platforms.binanceConfig.userId;
            }
            if (serializedUser.platforms.kucoinConfig && Object.keys(serializedUser.platforms.kucoinConfig).length > 0) {
                delete serializedUser.platforms.kucoinConfig._id;
                delete serializedUser.platforms.kucoinConfig.__v;
                delete serializedUser.platforms.kucoinConfig.userId;
            }
        } else {
            serializedUser.platforms = {};
        }
        if(serializedUser.configuration){
            delete serializedUser.configuration._id;
            delete serializedUser.configuration.__v;
            delete serializedUser.configuration.userId;
        } else {
            serializedUser.configuration = {};
        }
        
        return serializedUser;
    }

}

module.exports = userService;