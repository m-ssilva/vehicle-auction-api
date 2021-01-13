const vehiclesLib = require('../lib/vehicles')

const getAllVehicles = async (req, res, next) => {
  const { sort, order } = req.query
  const allVehicles = await vehiclesLib.getAllVehicles(sort, order).catch(e => next(e))
  res.status(200).send(allVehicles)
}

const getVehicleById = async (req, res, next) => {
  const { id } = req.params
  await vehiclesLib.getVehicleById(id)
    .then(vehicle => {
      res.status(200).json(vehicle, [
        { rel: 'self', method: 'PUT', uri: req.originalUrl },
        { rel: 'self', method: 'DELETE', uri: req.originalUrl }
      ])
    })
    .catch(e => next(e))
}

const getVehiclesByLot = async (req, res, next) => {
  const { lot } = req.params
  const { sort, order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByLot(lot, sort, order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturer = async (req, res, next) => {
  const { manufacturer } = req.params
  const { sort, order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByManufacturer(manufacturer, sort, order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByModelName = async (req, res, next) => {
  const { modelName } = req.params
  const { sort, order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByModelName(modelName, sort, order).catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehicleByManufacturerYearAndModelYear = async (req, res, next) => {
  const { manufactureYear, modelYear } = req.params
  const { sort, order } = req.query
  const vehicles = await vehiclesLib.getVehicleByManufacturerYearAndModelYear(manufactureYear, modelYear, sort, order)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const getVehiclesByYearPeriod = async (req, res, next) => {
  const { startYear, endYear } = req.params
  const { sort, order } = req.query
  const vehicles = await vehiclesLib.getVehiclesByYearPeriod(startYear, endYear, sort, order)
    .catch(e => next(e))
  res.status(200).send(vehicles)
}

const createVehicle = async (req, res, next) => {
  const { body: vehicle } = req
  await vehiclesLib.createVehicle(vehicle).then(createdVehicle => {
    res.location(`${req.headers.host}${req.originalUrl}/${createdVehicle.id}`)
    res.status(201).json(createdVehicle, [
      { rel: 'self', method: 'GET', uri: `${req.originalUrl}/${createdVehicle.id}` },
      { rel: 'self', method: 'PUT', uri: `${req.originalUrl}/${createdVehicle.id}` },
      { rel: 'self', method: 'DELETE', uri: `${req.originalUrl}/${createdVehicle.id}` }
    ])
  }).catch(e => next(e))
}

const updateVehicle = async (req, res, next) => {
  const { id } = req.params
  const { body: vehicle } = req
  const updatedVehicle = await vehiclesLib.updateVehicle(id, vehicle).catch(e => next(e))
  res.status(200).send(updatedVehicle)
}

const deleteVehicle = async (req, res, next) => {
  const { id } = req.params
  vehiclesLib.deleteVehicle(id)
    .then(_ => res.status(204).send())
    .catch(e => next(e))
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehiclesByLot,
  getVehicleByManufacturer,
  getVehicleByModelName,
  getVehicleByManufacturerYearAndModelYear,
  getVehiclesByYearPeriod,
  createVehicle,
  updateVehicle,
  deleteVehicle
}