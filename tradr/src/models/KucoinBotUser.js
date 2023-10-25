const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KucoinBotUserSchema = new Schema({
    apiKey: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    passphrase: {
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
})

module.exports = mongoose.model('KucoinBotUser', KucoinBotUserSchema)