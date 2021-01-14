const Joi = require('joi')

const defaultQueryParams = {
  query: Joi.object({
    _sort: Joi.string(),
    _order: Joi.string().valid('asc', 'desc'),
    _limit: Joi.number().integer().positive(),
    _offset: Joi.number().integer().positive()
  })
}

module.exports = {
  GET_VEHICLE_BY_ID: {
    params: Joi.object({
      id: Joi.number().required()
    })
  },
  GET_ALL_VEHICLES: {
    ...defaultQueryParams
  },
  GET_VEHICLES_BY_LOT: {
    ...defaultQueryParams
  },
  GET_VEHICLES_BY_MANUFACTURER: {
    ...defaultQueryParams
  },
  GET_VEHICLES_BY_MODEL_NAME: {
    ...defaultQueryParams
  },
  GET_VEHICLES_BY_MANUFACTURER_YEAR_AND_MODEL_YEAR: {
    ...defaultQueryParams
  },
  GET_VEHICLES_BY_MANUFACTURE_YEAR_PERIOD: {
    ...defaultQueryParams
  },
  CREATE_VEHICLE: {
    body: Joi.object({
      lot: Joi.string().pattern(/^[0-9]+$/).required(),
      control_code: Joi.string().pattern(/^[0-9]+$/).required(),
      manufacturer_name: Joi.string().required(),
      manufacture_year: Joi.number().integer().strict().min(1000).max(9999).required(),
      model_name: Joi.string().required(),
      model_year: Joi.number().integer().strict().min(1000).max(9999).required(),
      bid: Joi.object({
        date: Joi.date().required(),
        value: Joi.number().strict().required(),
        user: Joi.string().required()
      })
    })
  },
  UPDATE_VEHICLE: {
    params: Joi.object({
      id: Joi.number().required()
    }),
    body: Joi.object({
      lot: Joi.string().pattern(/^[0-9]+$/),
      control_code: Joi.string().pattern(/^[0-9]+$/),
      manufacturer_name: Joi.string(),
      manufacture_year: Joi.number().integer().strict().min(1000).max(9999),
      model_name: Joi.string(),
      model_year: Joi.number().integer().strict().min(1000).max(9999),
      bid: Joi.object({
        date: Joi.date(),
        value: Joi.number().strict(),
        user: Joi.string()
      })
    }).min(1)
  },
  DELETE_VEHICLE: {
    params: Joi.object({
      id: Joi.number().required()
    })
  }
}