require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const { connectDB } = require('./config/db')

// middleware
const { logger, errorHandler, cors, logEvents } = require('./middleware')
const cookieParser = require('cookie-parser')

// routers
const rootRouter = require('./routes/root')
const usersRouter = require('./routes/users.routes')

// init express instance
const app = express()
const port = process.env.PORT || 3500

// init db connection
connectDB()

// middleware
app.use(logger) // logs request to log file and console
app.use(cors) // custom cors
app.use(express.json()) // receive and parse json data
app.use(cookieParser()) // parses cookies for us

// static folder
app.use(express.static(path.resolve(__dirname, 'public')))

// routes
app.use(rootRouter)
app.use('/users', usersRouter)

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

// custom error handler
app.use(errorHandler)

// mongoose event listener
mongoose.connection.once('open', () => {
  console.log(`CONNECTED TO MONGODB: ${mongoose.connection.name}`)

  app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT: ${port}`)
  })
})

// mongoose event listener
mongoose.connection.on('error', (error) => {
  console.log(error)

  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    'mongo_errors.log'
  )
})
