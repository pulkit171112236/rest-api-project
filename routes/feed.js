const feedController = require('../controllers/feed')

const router = require('express').Router()

router.get('/posts', feedController.getPosts)

router.post('/post', feedController.createPost)

module.exports = router
