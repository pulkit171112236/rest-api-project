// import node-inbuilt-packages
const path = require('path')

// import user-installed packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

// file-imports
const { APP_HOME } = require('./utils/path')
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

// declare variables and methods
const app = express()
const fileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString() + '-' + file.originalname
    cb(null, fileName)
  },
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else cb(null, false)
}

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

// process file using multer middleware
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)

// serving routes
app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

// handling errors
app.use((error, req, res, next) => {
  console.log('---error---\n', error)
  const status = error.statusCode || 500
  const message = error.message
  return res.status(status).json({
    message: message,
    data: error.data,
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
