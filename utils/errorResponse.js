exports.errorResponse = (message, status) => {
  const error = new Error(message)

  error.status = status

  throw error
}
