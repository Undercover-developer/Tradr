const redisClient = require('../../config/redisClient');
const { saveTrade } = require('../../services/Trade');
const initRedisSubscribers = async () => {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    console.log('Redis subscriber connected');
    await subscriber.subscribe('trade-log', async (message) => {
        saveTrade(JSON.parse(message));
        console.log(JSON.parse(message))
        await redisClient.publish('new-trade', JSON.stringify(message));
    });
}

initRedisSubscribers()