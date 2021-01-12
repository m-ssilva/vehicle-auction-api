const errorSchema = require('./error-schemas')
const logger = require('../../server/logger')

const errorHandler = async (err, _req, res, next) => {
  if (err) {
    logger.error('Error', err)
    const status = errorSchema[err.message] ? errorSchema[err.message].status : errorSchema['DEFAULT'].status
    const body = errorSchema[err.message] ? errorSchema[err.message].body : errorSchema['DEFAULT'].body
    res.status(status).send(body)
  } return next()
}

module.exports = errorHandler