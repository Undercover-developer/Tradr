const UserConfiguration = require('../models/UserConfiguration');

class UserConfigurationService {
    static async getUserConfiguration (userId) {
        return UserConfiguration.findOne({ userId });
    }

    static async createOrUpdateUserConfiguration (userId, userConfiguration) {
        return UserConfiguration.findOneAndUpdate({ userId }, userConfiguration, { new: true, upsert: true });
    }
}

module.exports = UserConfigurationService;