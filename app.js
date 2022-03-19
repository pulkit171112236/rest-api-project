const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const feedRoutes = require('./routes/feed')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  // res.setHeader('Access-Control-Allow-Headers', '*')
  console.log('--body:', req.body)
  next()
})

app.use('/feed', feedRoutes)

app.listen(8080)
