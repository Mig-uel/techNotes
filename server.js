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

// 404
app.all('*', (req, res) => {
  res.status(404)

  // html request
  if (req.accepts('html')) {
    return res.sendFile(path.resolve(__dirname, 'views', '404.html'))
  }
  // json request
  else if (req.accepts('json')) {
    return res.json({ message: '404 Not Found' })
  }
  // if html or json was not matched in the accepts header
  else {
    res.type('txt').send('404 Not Found')
  }
})

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
