const BinanceBotUser = require('../model/MetaApiBotUser');

const createOrUpdateBotUser = async (req, res) => {
    try {
        const { apiKey, apiSecret, userId, configuration, enabled } = req.body;
        const botUser = await BinanceBotUser.findOne({ userId });
        if (botUser) {
            botUser.apiKey = apiKey;
            botUser.apiSecret = apiSecret;
            botUser.configuration = configuration;
            botUser.enabled = enabled;
            await botUser.save();
            return res.send(botUser);
        }
        const newBotUser = new BinanceBotUser({
            apiKey,
            apiSecret,
            userId,
            configuration,
            enabled
        });
        await newBotUser.save();
        return res.send(newBotUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    createOrUpdateBotUser
}