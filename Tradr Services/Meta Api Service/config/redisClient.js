const redis = require('redis');
const redisClient = redis.createClient(
   { url: process.env.REDIS_URL || 'redis://localhost:6379', },
);
redisClient.connect();
redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

module.exports = redisClient;