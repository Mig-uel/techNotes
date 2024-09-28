const path = require('path')
const express = require('express')

// routers
const rootRouter = require('./routes/root')

// init express instance
const app = express()
const port = process.env.PORT || 3500

// static folder
app.use(express.static(path.resolve(__dirname, 'public')))

// routes
app.use(rootRouter)

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
