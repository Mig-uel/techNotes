const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

// logger function helper
const logEvents = async (message, logFileName) => {
  const dateAndTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateAndTime}\t${uuid()}\t${message}\n`

  try {
    // check if 'logs' directory exists, if not make one
    if (!fs.existsSync(path.resolve(__dirname, '.', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }

    // will either create the file or append data to the file path given
    await fsPromises.appendFile(
      path.resolve(__dirname, '..', 'logs', logFileName),
      logItem
    )
  } catch (error) {
    console.log(error)
  }
}
