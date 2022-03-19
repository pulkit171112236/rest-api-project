// import node-inbuilt-packages
const path = require('path')

// import user-installed packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// file-imports
const { APP_HOME } = require('./utils/path')
const feedRoutes = require('./routes/feed')

// declare variables and methods
const app = express()

// setting access-control serverside
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// parsing body-content
app.use(bodyParser.json())

// serving static images
app.use('/images', express.static(path.join(APP_HOME, 'images')))

// serving routes
app.use('/feed', feedRoutes)

// handling errors
app.use((error, req, res, next) => {
  console.log('---error---\n', error)
  const status = error.statusCode || 500
  const message = error.message
  return res.status(status).json({
    message: message,
  })
})

// database connection and start server
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
