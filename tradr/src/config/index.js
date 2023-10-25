require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 9090,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tradr',
    JWT_SECRET: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237',
    API: {
        prefix: '/api/v1',
    },
}