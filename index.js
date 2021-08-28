const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

require('./database/mongoose')

app.use(express.json())

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log('Server running successfully on port: ' + process.env.PORT)
})
