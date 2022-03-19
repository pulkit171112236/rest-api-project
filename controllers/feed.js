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
  const title = req.body.title
  const content = req.body.content
  return res.status(201).json({
    message: 'Post created',
    post: {
      title: title,
      content: content,
      createdAt: new Date(),
      creator: { name: 'pulkit' },
      imageUrl: '<image-url>',
    },
  })
}
