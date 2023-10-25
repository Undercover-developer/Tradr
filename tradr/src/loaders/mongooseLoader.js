const mongoose = require('mongoose');
const config = require('../config/index');

module.exports = async function() {
    try {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}