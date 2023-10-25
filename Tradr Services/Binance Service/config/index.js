module.exports = {
    PORT: process.env.PORT || 7070,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tradr',
    API: {
        prefix: '/api',
    },
}