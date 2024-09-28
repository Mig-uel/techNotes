const { logEvents, logger } = require('./logger')
const { errorHandler } = require('./errorHandler')
const { cors } = require('./cors')

module.exports = {
  logger,
  errorHandler,
  cors,
  logEvents,
}
