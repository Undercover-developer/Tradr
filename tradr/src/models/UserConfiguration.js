const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserConfigurationSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: Number,
    },
    takeProfit: {
        type: Number,
    },
    stopLoss: {
        type: Number,
    },
    trailingStopLoss: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    tradeBy: {
        type: String
    },
});

module.exports = mongoose.model('UserConfiguration', UserConfigurationSchema);