const KucoinBotUser = require('../models/KucoinBotUser')

class KucoinBotUserService {
    static async getKucoinBotUser (userId) {
        return KucoinBotUser.findOne({ userId });
    }

    static async createOrUpdateKucoinBotUser (userId, kucoinBotUser) {
        return KucoinBotUser.findOneAndUpdate({ userId }, kucoinBotUser, { new: true, upsert: true });
    }
}

module.exports = KucoinBotUserService;