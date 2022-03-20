const fs = require('fs')
const path = require('path')

const { APP_HOME } = require('../utils/path')

const deleteFile = (filePath) => {
  const absPath = path.join(APP_HOME, filePath)
  return fs.promises.unlink(absPath)
}

module.exports = { deleteFile }
