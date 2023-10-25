const { Server } = require('socket.io');
module.exports = (server) => {
    const io = new Server(server);
    return io;
};