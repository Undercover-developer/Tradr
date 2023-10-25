const express = require('express');
const cors = require('cors');
const config = require('../config/index');
const indexRoutes = require('../routes/index.routes');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(config.API.prefix, indexRoutes);
}