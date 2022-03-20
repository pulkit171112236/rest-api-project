const router = require('express').Router()
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Not a valid email')
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('User already exists')
          }
        })
      }),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().notEmpty(),
  ],
  authController.createUser
)

router.get('/test', authController.test)

module.exports = router
