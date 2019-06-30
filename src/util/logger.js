const logError = (message) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message)
  }
}

const logInfo = (message) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(message)
  }
}

module.exports = { logError, logInfo }