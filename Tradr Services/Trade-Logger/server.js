const http = require('http');
const app = require('./src/app');
const config = require('./src/config');

const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Server is running on port:: ${config.port}`);
});
