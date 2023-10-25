const BinanceBotUserService = require('../services/binanceBotUserService');
const KucoinBotUserService = require('../services/kucoinBotService');
const UserConfigurationService = require('../services/userConfigurationService');
const userService = require('../services/userService');
const utilService = require('../services/utilService')

class UserConfigController {
    static async updatePlatformConfig (req, res) {
        try {
            const { userId } = req;
            const { platform, platformConfig } = req.body;
            if (!platform || !platformConfig) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide platform configurations'
                });
            }
            switch (platform) {
                case 'Binance':
                    const binanceUserConfig = await BinanceBotUserService.createOrUpdateBinanceBotUser(userId, platformConfig);
                    const user = await userService.updateUser(userId, { $set: { 'platforms.binanceConfig': binanceUserConfig._id } });
                    if(user.configuration) await BinanceBotUserService.createOrUpdateBinanceBotUser(userId, { configuration: user.configuration })
                    return res.status(200).json({
                        status: 'success',
                        message: 'Platform configuration updated',
                    });
                case 'Kucoin':
                    const kucoinUserConfig = await KucoinBotUserService.createOrUpdateKucoinBotUser(userId, platformConfig);
                    await userService.updateUser(userId, { $set: { 'platforms.kucoinConfig': kucoinUserConfig._id } });
                    return res.status(200).json({
                        status: 'success',
                        message: 'Platform configuration updated',
                    });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async tradeConfig (req, res) {
        try {
            const { userId } = req;
            const { size, stopLoss, takeProfit, trailingStopLoss, tradeBy, amount } = req.body;
            if (!size || !stopLoss || !takeProfit || !trailingStopLoss || !tradeBy || !amount) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Please provide complete trade configurations'
                });
            }
            const userConfig = await UserConfigurationService.createOrUpdateUserConfiguration(userId, { size, stopLoss, takeProfit, trailingStopLoss, tradeBy, amount });
            await userService.updateUser(userId, { configuration: userConfig._id });
            return res.status(200).json({
                status: 'success',
                message: 'Trade configuration updated',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = UserConfigController;