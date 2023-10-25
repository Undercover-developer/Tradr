const Trade = require('../models/Trade');

const saveTrade = async (trade) => {
    const newTrade = new Trade(trade);
    await newTrade.save();
};

module.exports = {
    saveTrade
}
