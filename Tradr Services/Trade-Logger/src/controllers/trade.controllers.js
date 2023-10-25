const Trade = require('../models/Trade');
class tradeController {
    static async getTrade(req, res) {
        const { userId } = req.params;
        const trade = await Trade.findById(userId);
        res.status(200).json(trade);
    }
}

module.exports = tradeController;