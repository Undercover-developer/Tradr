const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BinanceBotUserSchema = new Schema({
    apiKey: {
        type: String,
        required: true
    },
    apiSecret: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    configuration: {
        type: Schema.Types.ObjectId,
        ref: 'UserConfiguration'
    },
    enabled: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('BinanceBotUser', BinanceBotUserSchema);