const redisClient = require('../config/redisClient');
const TradeService = require('../services/tradeService');
module.exports = async (io) => {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    console.log('Redis subscriber connected');
    io.on('connection', async(socket) => {
        console.log('a user connected');
        
        // socket.join(socket.handshake.query.userId);
        socket.emit('message', 'Hello there from the server');
        socket.on('disconnect', () => {
            socket.leave(socket.handshake.query.userId);
        });
        
        await subscriber.subscribe('new-trade', (message) => {
            console.log(JSON.parse(message))
            socket.emit('message', JSON.parse(message));
        });
    });
};