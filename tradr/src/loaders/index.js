const initGlobalMiddlewares = require('../middlewares/globalMiddlewares')
const initMongoose = require('./mongooseLoader')

module.exports = async (app) => {
    await initGlobalMiddlewares(app)
    console.log('✌️ Middlewares loaded')
    initMongoose()
    console.log('✌️ MongoDB connected');

}