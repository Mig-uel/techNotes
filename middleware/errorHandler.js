const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
  const { method, url, headers } = req

  // logs error name, message, request method, url, and origin to 'errors.log'
  logEvents(
    `${err.name}: ${err.message}\t${method}\t${url}\t${headers.origin}`,
    'errors.log'
  )

  // log to the console the error stack
  console.log(err.stack)

  const status = err.status || 500
  const stack = process.env.NODE_ENV === 'development' ? err.stack : '🥞'

  return res.status(status).json({ error: err.message, status, stack })
}

module.exports = { errorHandler }
