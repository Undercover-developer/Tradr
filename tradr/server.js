const http = require('http');
const app = require('./src/app');
const initSocketIO = require('./src/loaders/socketIO');
const initSocketControllers = require('./src/controllers/socketController');

const server = http.createServer(app);
const io = initSocketIO(server);
initSocketControllers(io);

server.listen(process.env.PORT || 4000, () => {
    console.log(`🛡️  Server listening on port:: ${process.env.PORT || 4000}  🛡️`);
});
