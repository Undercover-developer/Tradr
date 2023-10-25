const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

module.exports = redisClient;