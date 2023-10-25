const express = require('express');
const app = express()
const cors = require('cors')
const config = require('./config/index')

const mongoose = require('mongoose')
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
app.use(cors())
app.use('/api', require('./routes/index.routes'))

app.listen(config.PORT, () => {
    console.log(`app started on PORT:: ${config.PORT}`)
})