const { default: axios } = require('axios')
const logger = require('../../server/logger')

/**
 * @method request
 * @param {Object} args Arguments provided to request
 * @param {string} args.url URL that will be requested
 * @param {string} args.method Method to be used (GET, POST, PATCH, DELETE)
 * @param {Object} args.params Parameters to be used in request
 * @param {Object} args.data Data to be provided on POST/PUT/PATCH method
 */
const request = async ({ ...args }) => {
  const url = JSON.stringify(args.url)
  const params = JSON.stringify(args)
  logger.debug(`Requesting ${url} with following args ${params}`)
  return axios(args)
    .then(({ data }) => {
      logger.debug(`Integration responded`, data)
      return data
    })
    .catch(e => {
      logger.debug(`Integration failed`, e)
      throw e
    })
}

module.exports = request