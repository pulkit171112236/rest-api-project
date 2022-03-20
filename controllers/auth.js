const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

exports.createUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('-----------validation-----------')
    console.log('body:', req.body)
    console.log(errors.array())
    const err = new Error('Validation errors')
    err.statusCode = 422
    err.data = errors.array()
    throw err
  }
  const password = req.body.password
  bcryptjs
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User()
      user.email = req.body.email
      user.password = hashedPw
      user.name = req.body.name
      return user.save()
    })
    .then((result) => {
      return res.status(201).json({
        message: 'User created',
        userId: result._id,
      })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
}

exports.test = (req, res, next) => {
  console.log('------test-------')
  const user = new User({
    email: 'admin@gmail.com',
    name: 'admin',
    password: 'admin',
    status: 'true',
    posts: [],
  })
  user.save().then((result) => {
    console.log('-----user-------')
    console.log(result)
    res.status(200).json({ message: 'created' })
  })
}
