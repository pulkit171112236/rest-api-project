const { validationResult } = require('express-validator')

const fileUtils = require('../utils/file')
const Post = require('../models/post')
const User = require('../models/user')

const ITEMS_PER_PAGE = 2

exports.getPosts = (req, res, next) => {
  const currPage = req.query.page || 1
  let totalItems
  Post.find()
    .count()
    .then((result) => {
      totalItems = result
      return Post.find()
        .skip(ITEMS_PER_PAGE * (currPage - 1))
        .limit(ITEMS_PER_PAGE)
    })
    .then((posts) => {
      if (!posts) {
        const err = new Error('No posts found')
        err.statusCode = 404
        throw err
      }
      return res.status(200).json({
        posts: posts,
        message: 'success',
        totalItems: totalItems,
      })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
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
    const error = new Error('Validation error')
    error.statusCode = 422
    throw error
  }
  const title = req.body.title
  const content = req.body.content
  const imageUrl = req.file.path
  const post = new Post({
    title: title,
    content: content,
    creator: req.userId,
    imageUrl: imageUrl,
  })
  let creator
  post
    .save()
    .then((post) => {
      return User.findById(req.userId)
    })
    .then((user) => {
      creator = user
      user.posts.push(post)
      return user.save()
    })
    .then((result) => {
      console.log('--result:', result)
      return res.status(201).json({
        message: 'Post created',
        post: post,
        creator: { id: creator._id.toString(), name: creator.name },
      })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
}

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation error')
    error.statusCode = 422
    throw error
  }
  const postId = req.params.postId
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error('post does not exists')
        err.statusCode = 404
        throw err
      }
      if (post.creator.toString() !== req.userId) {
        const err = new Error('Not authorized')
        err.statusCode = 403
        throw err
      }
      // update the post object
      if (req.file) {
        // deleting file is asynchronous
        fileUtils.deleteFile(post.imageUrl).catch((err) => {
          console.log('error deleting file: ', err)
        })
        post.imageUrl = req.file.path
      }
      post.title = req.body.title
      post.content = req.body.content
      return post.save()
    })
    .then((post) => {
      res.status(200).json({
        message: 'updated!',
        post: post,
      })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
}

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error('post does not exists')
        err.statusCode = 404
        throw err
      }
      var a = post.creator.toString()
      var b = req.userId
      if (post.creator.toString() !== req.userId) {
        const err = new Error('Not authorized')
        err.statusCode = 403
        throw err
      }
      fileUtils.deleteFile(post.imageUrl)
      return Post.findByIdAndRemove(postId)
    })
    .then((result) => {
      return User.findById(req.userId)
    })
    .then((user) => {
      user.posts.pull(postId)
      return user.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'Deleted' })
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
}
