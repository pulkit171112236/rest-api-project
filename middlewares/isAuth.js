const jwt = require('jsonwebtoken')

const SECRET_KEY = 'alonglongsecretkey'

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const err = new Error('Not Authenticated')
    err.statusCode = 401
    return next(err)
  }
  const token = authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, SECRET_KEY)
  req.userId = decodedToken.userId
  console.log('req.userId', req.userId)
  next()
}
