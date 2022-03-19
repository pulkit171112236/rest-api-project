const feedController = require('../controllers/feed')

const router = require('express').Router()

router.get('/', feedController.getPosts)

router.post('/post', feedController.createPost)

module.exports = router
