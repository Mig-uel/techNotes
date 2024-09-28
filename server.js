const path = require('path')
const express = require('express')

// init express instance
const app = express()
const port = process.env.PORT || 3500

// static folder
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
