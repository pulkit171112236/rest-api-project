const feedController = require('../controllers/feed')

const router = require('express').Router()

router.get('/', feedController.getFeeds)

module.exports = router
