const schemas = require('./schemas')

const errorParser = async (schemaValidator, value) => {
  const requestValidationType = Object.keys(schemaValidator).filter(ele => ele !== `type`) // body, query, param
  const [errors] = await requestValidationType.map(
    type => schemaValidator[type].validate(value[type]))
    .map(({ error }) => {
      if (error) return error.details
    }).filter(data => data)
  return errors
}

const parameterValidator = schemaName => async (req, res, next) => {
  const schemaValidator = schemas[schemaName]
  if (!schemaValidator) throw new Error(`SCHEMA_NOT_FOUND`)
  const errors = await errorParser(schemaValidator, req)
  if (errors) {
    res.status(400).send(errors)
  } else {
    return next()
  }
}

module.exports = parameterValidator