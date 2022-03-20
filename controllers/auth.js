const { validationResult } = require('express-validator')
const User = require('../models/user')

exports.createUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('-----------validation-----------')
    console.log('body:', req.body)
    console.log(errors.array())
    return res.json({
      message: 'validation errors',
      data: errors.array(),
    })
  }
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
