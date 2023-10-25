const Trade = require('../models/Trade');

class TradeService {
    static async createNewTrade (tradeInfo) {
        const newTrade = {
            tradeId: AuthService.generateUUID(),
            userId: tradeInfo.userId,
            platform: tradeInfo.platform,
            symbol: tradeInfo.symbol,
            side: tradeInfo.side,
            status: tradeInfo.status,
            profit: tradeInfo.profit,
            volume: tradeInfo.volume,
            price: tradeInfo.price
        }
        return Trade.create(newTrade)
    }
    static async getTradesByUserId (userId) {
        return Trade.find({ userId });
    }
}