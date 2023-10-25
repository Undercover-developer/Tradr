const express = require('express');
const app = express();
require('./loaders/index')(app);

module.exports = app;

