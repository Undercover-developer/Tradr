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
    trailingStop: {
        type: Number,
    },
});

module.exports = mongoose.model('UserConfiguration', UserConfigurationSchema);