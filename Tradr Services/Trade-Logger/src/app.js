const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
require('./events/subscribers/redis');
const globalMiddlewares = require('./middlewares/globalMiddlewares');
globalMiddlewares(app);

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log(err);
});
module.exports = app;