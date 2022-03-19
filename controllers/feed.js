exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [{ title: 'this is the title of first post' }],
  })
}

exports.createPost = (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  console.log(title, content)
  return res.status(201).json({
    message: 'Post created',
    post: {
      title: title,
      content: content,
    },
  })
}
