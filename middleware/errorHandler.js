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

  const status = res.statusCode || 500

  res.status(status)
  return res.json({ error: err.message, status: status })
}

module.exports = { errorHandler }
