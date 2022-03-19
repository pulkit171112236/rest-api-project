const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [
      {
        _id: '1',
        content: 'dlfjo',
        title: 'this is the title of first post',
        creator: { name: 'pulkit' },
        imageUrl: `https://www.computerhope.com/jargon/j/javascript.png`,
        createdAt: new Date(),
        imageUrl: 'oidjfo',
      },
    ],
  })
}

exports.createPost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation errors are present!',
      errors: errors.array(),
    })
  }
  const title = req.body.title
  const content = req.body.content
  const post = new Post({
    title: title,
    content: content,
    creator: { name: 'pulkit' },
  })
  post
    .save()
    .then((result) => {
      console.log('--result:', result)
      return res.status(201).json({
        message: 'Post created',
        post: post,
      })
    })
    .catch((err) => {
      console.log(err)
      return res.status(401).json({
        error: err,
      })
    })
}
