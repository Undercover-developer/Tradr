const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    platforms: {
        binanceConfig: {
            type: Schema.Types.ObjectId,
            ref: 'BinanceBotUser'
        },
        kucoinConfig: {
            type: Schema.Types.ObjectId,
            ref: 'KucoinBotUser'
        },
    },
    configuration: {
        type: Schema.Types.ObjectId,
        ref: 'UserConfiguration'
    },
    tempSecret: {
        type: Object,
        required: false
    },
    secret: {
        type: Object,
        required: false
    }, 
})

module.exports = mongoose.model('User', UserSchema);