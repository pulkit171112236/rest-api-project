const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      if (!posts) {
        const err = new Error('No posts found')
        err.statusCode = 422
        throw err
      }
      return res.status(200).json({
        posts: posts,
        message: 'success',
      })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
  // return res.status(200).json({
  //   posts: [
  //     {
  //       _id: '1',
  //       content: 'dlfjo',
  //       title: 'this is the title of first post',
  //       creator: { name: 'pulkit' },
  //       imageUrl: `https://www.computerhope.com/jargon/j/javascript.png`,
  //       createdAt: new Date(),
  //       imageUrl: 'oidjfo',
  //     },
  //   ],
  // })
}

exports.getPost = (req, res, next) => {
  const postId = req.params.postId
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error('No post found')
        err.statusCode = 404
        throw err
      }
      return res.status(200).json({
        message: 'success',
        post: post,
      })
    })
    .catch((err) => {
      next(err)
    })
}

exports.createPost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation-error')
    error.statusCode = 422
    throw error
  }
  const title = req.body.title
  const content = req.body.content
  const imageUrl = req.file.path
  const post = new Post({
    title: title,
    content: content,
    creator: { name: 'pulkit' },
    imageUrl: imageUrl,
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
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
}
