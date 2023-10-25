const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TradeSchema = new Schema({
    tradeId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Trade', TradeSchema);