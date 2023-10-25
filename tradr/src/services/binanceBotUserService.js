const BinanceBotUser = require('../models/BinanceBotUser');

class BinanceBotUserService {
    static async getBinanceBotUser (userId) {
        return BinanceBotUser.findOne({ userId });
    }

    static async createOrUpdateBinanceBotUser (userId, binanceBotUser) {
        return BinanceBotUser.findOneAndUpdate({ userId }, binanceBotUser, { new: true, upsert: true });
    }
}

module.exports = BinanceBotUserService;