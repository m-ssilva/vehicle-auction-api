const Joi = require('joi')

const defaultQueryParams = {
  query: Joi.object({
    sortBy: Joi.string(),
    orderBy: Joi.string().valid('asc', 'desc')
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
      manufacture_year: Joi.string().pattern(/^\d{4}$/).required(),
      model_name: Joi.string().required(),
      model_year: Joi.string().pattern(/^\d{4}$/).required(),
      bid: Joi.object({
        date: Joi.string().pattern(/(\d{2})\/(\d{2})\/(\d{4})\s-\s(\d{2}):(\d{2})/).required(),
        value: Joi.number().required(),
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
      manufacture_year: Joi.string().pattern(/^\d{4}$/),
      model_name: Joi.string(),
      model_year: Joi.string().pattern(/^\d{4}$/),
      bid: Joi.object({
        date: Joi.string().pattern(/(\d{2})\/(\d{2})\/(\d{4})\s-\s(\d{2}):(\d{2})/),
        value: Joi.number(),
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