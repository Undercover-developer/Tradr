const express = require('express');
const app = express()
const cors = require('cors')
const config = require('./config/index')

//to do: implement mongoose connection
app.use(cors())
app.use('/trade', require('./routes/trade.routes'))

app.listen(config.PORT, ()=> {
    console.log(`app started on PORT:: ${config.PORT}`)
})