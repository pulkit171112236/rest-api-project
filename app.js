const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

const feedRoutes = require('./routes/feed')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/feed', feedRoutes)

mongoose
  .connect(
    'mongodb+srv://pulkit:5tEvPesz6qA3izWh@cluster0.qgwii.mongodb.net/restApi?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(8080)
    console.log('server listening at 8080')
  })
  .catch((err) => {
    console.log('error while connecting database: ', err)
  })
