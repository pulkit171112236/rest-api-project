const feedController = require('../controllers/feed')

const router = require('express').Router()

router.get('/', feedController.getPosts)

module.exports = router
