const path = require('path')
const express = require('express')

const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
